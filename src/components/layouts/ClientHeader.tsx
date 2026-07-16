"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, User, Menu, X, ChevronDown, LogOut, LayoutDashboard } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { useCart } from "@/contexts/CartContext";

interface ClientHeaderProps {
  user: SupabaseUser | null;
  isAdmin: boolean;
}

export function ClientHeader({ user, isAdmin }: ClientHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  const { language } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const { openCart, itemCount } = useCart();
  
  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setUserMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const navItems = [
    {
      id: "lab",
      labelEn: "Lab",
      labelAr: "المختبر",
      href: "/lab",
      dropdown: [
        { labelEn: "Our Studies", labelAr: "دراساتنا", href: "/lab/studies" },
        { labelEn: "Our GitHub", labelAr: "GitHub الخاص بنا", href: "/lab/github" },
        { labelEn: "Projects", labelAr: "المشاريع", href: "/lab/projects" },
      ],
    },
    {
      id: "library",
      labelEn: "Library",
      labelAr: "المكتبة",
      href: "/library",
      dropdown: [
        { labelEn: "Population Genomics", labelAr: "علم الجينوم السكاني", href: "/library/population-genomics" },
        { labelEn: "Human Health", labelAr: "الصحة البشرية", href: "/library/human-health" },
        { labelEn: "History", labelAr: "التاريخ", href: "/library/history" },
      ],
    },
    {
      id: "products",
      labelEn: "Products",
      labelAr: "منتجاتنا",
      href: "/products",
    },
    // {
    //   id: "our-people",
    //   labelEn: "Our People",
    //   labelAr: "فريقنا",
    //   href: "/our-people",
    // },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50 h-16"
          : "bg-background border-b border-border/0 h-20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link href="/">
            <span className="text-xl font-bold tracking-tight text-foreground hover:text-primary transition-colors">
              SNP
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <div
              key={item.id}
              className="relative group h-full flex items-center"
              onMouseEnter={() => setActiveDropdown(item.id)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-8"
              >
                {t(language, item.labelEn, item.labelAr)}
                {item.dropdown && (
                  <ChevronDown className="w-3.5 h-3.5 opacity-50 group-hover:rotate-180 transition-transform duration-200" />
                )}
              </Link>

              {/* Desktop Dropdown */}
              {item.dropdown && activeDropdown === item.id && (
                <div className="absolute top-[calc(100%-1rem)] left-1/2 -translate-x-1/2 w-56 bg-card border border-border shadow-lg rounded-xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {item.dropdown.map((drop) => (
                    <Link
                      key={drop.href}
                      href={drop.href}
                      className="block px-5 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-accent/50 transition-colors"
                    >
                      {t(language, drop.labelEn, drop.labelAr)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          {!user ? (
            <Link
              href="/login"
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Sign in"
            >
              <User className="w-4 h-4" />
            </Link>
          ) : (
            <div 
              ref={userMenuRef}
              className="hidden md:flex relative h-full items-center"
            >
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-accent/50 text-foreground transition-colors hover:bg-accent overflow-hidden"
                aria-label="User menu"
                aria-expanded={userMenuOpen}
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt="User Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex w-full h-full items-center justify-center bg-primary/10 text-primary font-semibold text-sm">
                    {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
              </button>
              
              {userMenuOpen && (
                <div className="absolute top-[calc(100%-0.5rem)] right-0 w-64 bg-card border border-border shadow-lg rounded-xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-5 py-4 border-b border-border/50 mb-2">
                    <div className="flex items-center gap-3">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="User Avatar" className="h-10 w-10 shrink-0 rounded-full object-cover" />
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                          {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                        </div>
                      )}
                      <div className="flex flex-col min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {user.email?.split("@")[0] || "User"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-5 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-accent/50 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      {t(language, "Admin Dashboard", "لوحة الإدارة")}
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      handleSignOut();
                    }}
                    className="w-full flex items-center gap-2 px-5 py-2.5 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    {t(language, "Sign out", "تسجيل الخروج")}
                  </button>
                </div>
              )}
            </div>
          )}
          
          <button
            type="button"
            onClick={openCart}
            className="relative flex items-center gap-2 hover:opacity-80 transition-opacity"
            aria-label={t(language, "Cart", "العربة")}
          >
            <ShoppingBag className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium hidden sm:inline-block">
              {t(language, "Cart", "العربة")}
            </span>
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground sm:top-0 sm:right-auto sm:-translate-y-1/2 sm:translate-x-1/2">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-accent/50 text-foreground ml-2"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-xl animate-in slide-in-from-top-2">
          <div className="px-6 py-4 flex flex-col gap-2 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.id} className="flex flex-col">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    className="py-3 text-base font-medium text-foreground"
                  >
                    {t(language, item.labelEn, item.labelAr)}
                  </Link>
                  {item.dropdown && (
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.id ? null : item.id)}
                      className="p-3 text-muted-foreground"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.id ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>
                
                {/* Mobile Dropdown Expanded */}
                {item.dropdown && activeDropdown === item.id && (
                  <div className="flex flex-col pl-4 border-l-2 border-border/50 ml-2 mt-1 mb-3 space-y-1">
                    {item.dropdown.map((drop) => (
                      <Link
                        key={drop.href}
                        href={drop.href}
                        className="py-2.5 text-sm text-muted-foreground"
                      >
                        {t(language, drop.labelEn, drop.labelAr)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="h-px bg-border my-4" />
            
            {!user ? (
              <Link
                href="/login"
                className="flex items-center gap-3 py-3 text-base font-medium text-foreground"
              >
                <User className="w-5 h-5" />
                {t(language, "Sign in", "تسجيل الدخول")}
              </Link>
            ) : (
              <div className="flex flex-col gap-1">
                <div className="py-2 mb-2 flex items-center gap-3">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="User Avatar" className="h-10 w-10 shrink-0 rounded-full object-cover" />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                      {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                  <div className="flex flex-col min-w-0">
                    <p className="text-base font-medium text-foreground truncate">
                      {user.email?.split("@")[0] || "User"}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-3 py-2.5 text-base font-medium text-foreground"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    {t(language, "Admin Dashboard", "لوحة الإدارة")}
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 py-2.5 text-base font-medium text-destructive text-left"
                >
                  <LogOut className="w-5 h-5" />
                  {t(language, "Sign out", "تسجيل الخروج")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
