// Update these specific parts in Navbar.tsx

// Logo section - change emerald to teal
<Link to="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#00897B] to-[#4DB6AC] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
    <img
      src="https://i.ibb.co/N6Cft6S3/IMG-20260614-015637.jpg"
      alt="Prayas Logo"
      className="w-full h-full object-cover"
    />
  </div>
  <div className="flex flex-col leading-tight">
    <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-[#263238] group-hover:text-[#00897B] transition-colors">
      Prayas
    </span>
    <span className="hidden min-[480px]:block text-[8px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.18em] text-[#263238]/60">
      Samaj Sevi Sanstha
    </span>
  </div>
</Link>

// Nav links - change emerald to teal
{navLinks.map((link) => (
  <Link
    key={link.name}
    to={link.path}
    className={`text-sm font-medium transition-colors relative py-2 group whitespace-nowrap ${
      location.pathname === link.path
        ? 'text-[#00897B]'
        : 'text-[#263238]/80 hover:text-[#263238]'
    }`}
  >
    {link.name}
    <span
      className={`absolute -bottom-1 left-0 h-[2px] bg-[#00897B] transition-all ${
        location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
      }`}
    />
  </Link>
))}

// Donate button - change emerald to teal
<Link
  to="/donate"
  className="hidden sm:inline-flex items-center gap-1.5 bg-[#00897B] text-white px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-semibold rounded-full hover:bg-[#00897B]/90 transition-all shadow-lg shadow-[#00897B]/20 hover:shadow-[#00897B]/30 hover:scale-105"
>
  Donate Now
  <Heart className="w-4 h-4" />
</Link>

// Sign In / Profile Link - change emerald to teal
<Link
  to={isAuthenticated ? "/profile" : "/auth"}
  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full border border-[#00897B]/30 text-[#00897B] hover:bg-[#00897B]/10 transition-all hover:scale-105"
>
  <User className="w-4 h-4" />
  {isAuthenticated ? "Profile" : "Sign In"}
</Link>

// Mobile menu active link
className={`text-lg font-medium py-3 px-2 rounded-lg transition-colors ${
  location.pathname === link.path
    ? 'text-[#00897B] bg-[#00897B]/5'
    : 'text-[#263238]/80 hover:text-[#263238] hover:bg-black/5'
}`}

// Mobile Donate button
<Link
  to="/donate"
  className="mt-3 w-full text-center rounded-full bg-[#00897B] px-6 py-3.5 font-semibold text-white flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-transform"
>
  Donate Now <Heart className="w-5 h-5" />
</Link>

// Mobile Sign In button
<Link
  to={isAuthenticated ? "/profile" : "/auth"}
  className="mt-2 w-full text-center rounded-full border border-[#00897B]/30 px-6 py-3.5 font-semibold text-[#00897B] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
>
  <User className="w-5 h-5" />
  {isAuthenticated ? "Profile" : "Sign In"}
</Link>
