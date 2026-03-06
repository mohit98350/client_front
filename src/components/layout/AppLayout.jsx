import { BookText, ChartNoAxesCombined } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    to: "/library",
    label: "Paper Library",
    icon: BookText,
  },
  {
    to: "/analytics",
    label: "Reading Analytics",
    icon: ChartNoAxesCombined,
  },
];

export function AppLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
          <Link
            to="/library"
            className="group inline-flex items-center gap-3 rounded-xl border border-transparent p-1 transition-colors hover:border-border/70"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-chart-2 text-primary-foreground shadow-lg shadow-primary/30 ring-1 ring-primary/30">
              <ChartNoAxesCombined className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Research Command Center</p>
              <h1 className="text-2xl font-bold tracking-tight transition-colors group-hover:text-primary">Paper Reading Tracker</h1>
            </div>
          </Link>

          <nav className="flex items-center gap-2 rounded-xl border border-border/80 bg-card/80 p-1.5 shadow-lg shadow-black/20">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                        : "hover:bg-accent/80 hover:text-accent-foreground"
                    )
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="container py-8">
        <Outlet />
      </main>
    </div>
  );
}
