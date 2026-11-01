/**
 * Lumière | لوميير - Application Core
 * Pure Vanilla JavaScript (ES6+) - Zero Frameworks / Zero Dependencies
 */

(function () {
  "use strict";

  // Storage Keys Version 1
  const STORAGE_KEYS = {
    CART: "lumiere_cart_v1",
    FAVORITES: "lumiere_favorites_v1",
    LANG: "lumiere_lang"
  };

  // Safe Global Image Error Fallback Handler
  window.handleImageError = function (img) {
    if (img && !img.dataset.hasFailed) {
      img.dataset.hasFailed = "true";
      img.src = window.LUMIERE_FALLBACK_IMAGE || LUMIERE_FALLBACK_IMAGE;
    }
  };

  // Helper: Image path resolver
  function resolveImage(imgSrc, productId, index = 0) {
    const config = window.STORE_CONFIG || (typeof STORE_CONFIG !== "undefined" ? STORE_CONFIG : {});
    if (config.imageBasePath && config.imageBasePath.trim() !== "") {
      const base = config.imageBasePath.replace(/\/+$/, "");
      return `${base}/${productId}-${index + 1}.jpg`;
    }
    return imgSrc || window.LUMIERE_FALLBACK_IMAGE || (typeof LUMIERE_FALLBACK_IMAGE !== "undefined" ? LUMIERE_FALLBACK_IMAGE : "");
  }

  // Single Application Namespace
  const App = {
    // Application State
    state: {
      lang: "ar",
      // Lightweight cart lines: { productId, size, color, qty }
      cart: [],
      // Lightweight favorites: [ productId, ... ]
      favorites: [],
      filters: {
        category: "all",
        search: "",
        sort: "newest",
        minPrice: null,
        maxPrice: null,
        size: "",
        color: "",
        inStockOnly: false
      },
      pagination: {
        page: 1,
        perPage: 12
      },
      activeProduct: null,
      selectedDetailVariant: {
        color: null,
        size: null,
        quantity: 1
      },
      checkout: {
        step: 1,
        governorate: null,
        customer: {
          fullName: "",
          mobile: "",
          whatsapp: "",
          sameAsMobile: true,
          governorateId: "",
          city: "",
          address: "",
          landmark: "",
          notes: ""
        },
        paymentMethod: "cod"
      },
      lastCreatedOrder: null
    },

    // Initialization
    init() {
      this.runDevImageCheck();
      this.loadSavedState();
      this.initI18n();
      this.setupDOM();
      this.setupEventListeners();
      this.renderAll();
      this.initScrollReveals();
    },

    // Developer Diagnostic: Verify unique images and catalog consistency
    runDevImageCheck() {
      const seenImages = new Map();
      const duplicateUrls = [];
      const missingImages = [];

      PRODUCTS.forEach(p => {
        if (!p.images || !Array.isArray(p.images) || p.images.length === 0) {
          missingImages.push(p.id);
          return;
        }

        p.images.forEach((imgUrl, idx) => {
          if (!imgUrl || typeof imgUrl !== "string") {
            missingImages.push(`${p.id}[${idx}]`);
            return;
          }
          if (seenImages.has(imgUrl)) {
            duplicateUrls.push({
              url: imgUrl,
              firstProduct: seenImages.get(imgUrl),
              duplicateProduct: p.id
            });
          } else {
            seenImages.set(imgUrl, p.id);
          }
        });
      });

      if (duplicateUrls.length > 0) {
        console.warn("[Lumière Dev Check] Found duplicate image URLs in catalog:", duplicateUrls);
      }
      if (missingImages.length > 0) {
        console.warn("[Lumière Dev Check] Products with missing images:", missingImages);
      }
      if (duplicateUrls.length === 0 && missingImages.length === 0) {
        console.log(`[Lumière Dev Check] All ${PRODUCTS.length} products verified: 100% unique images & valid formats.`);
      }
    },

    // Safe LocalStorage Handler (Lightweight, validated against PRODUCTS)
    loadSavedState() {
      // 1. Language
      try {
        const savedLang = localStorage.getItem(STORAGE_KEYS.LANG);
        if (savedLang === "ar" || savedLang === "en") {
          this.state.lang = savedLang;
        }
      } catch (e) {
        console.warn("Storage access restricted for lang:", e);
      }

      // 2. Favorites (Array of product IDs)
      try {
        const rawFavorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
        if (rawFavorites) {
          const parsed = JSON.parse(rawFavorites);
          if (Array.isArray(parsed)) {
            // Validate: only keep IDs that exist in current PRODUCTS
            this.state.favorites = parsed.filter(id => PRODUCTS.some(p => p.id === id));
          }
        }
      } catch (e) {
        console.warn("Storage access restricted for favorites:", e);
        this.state.favorites = [];
      }

      // 3. Cart (Array of { productId, size, color, qty })
      try {
        const rawCart = localStorage.getItem(STORAGE_KEYS.CART);
        if (rawCart) {
          const parsed = JSON.parse(rawCart);
          if (Array.isArray(parsed)) {
            // Validate against current PRODUCTS and sanitize qty
            this.state.cart = parsed
              .filter(item => item && item.productId && PRODUCTS.some(p => p.id === item.productId))
              .map(item => ({
                productId: item.productId,
                size: String(item.size || "M"),
                color: String(item.color || ""),
                qty: Math.max(1, parseInt(item.qty, 10) || 1)
              }));
          }
        }
      } catch (e) {
        console.warn("Storage access restricted for cart:", e);
        this.state.cart = [];
      }
    },

    saveState(key) {
      try {
        if (key === "cart") {
          localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(this.state.cart));
        } else if (key === "favorites") {
          localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(this.state.favorites));
        } else if (key === "lang") {
          localStorage.setItem(STORAGE_KEYS.LANG, this.state.lang);
        }
      } catch (e) {
        console.warn("Storage save error:", e);
      }
    },

    // Format Currency (EGP / ج.م)
    formatCurrency(amount) {
      const isArabic = this.state.lang === "ar";
      const formattedNumber = new Intl.NumberFormat(isArabic ? "ar-EG" : "en-US", {
        maximumFractionDigits: 0
      }).format(amount);
      const symbol = isArabic ? STORE_CONFIG.currency.ar : STORE_CONFIG.currency.en;
      return `${formattedNumber} ${symbol}`;
    },

    // Format Number with Western digits (for phone & references)
    formatWesternNumber(num) {
      return new Intl.NumberFormat("en-US").format(num);
    },

    // i18n System
    t(key, replacements = {}) {
      const dict = I18N[this.state.lang] || I18N.ar;
      let text = dict[key] || (I18N.ar[key] || key);
      for (const [k, v] of Object.entries(replacements)) {
        text = text.replace(new RegExp(`\\{${k}\\}`, "g"), v);
      }
      return text;
    },

    initI18n() {
      const html = document.documentElement;
      html.setAttribute("lang", this.state.lang);
      html.setAttribute("dir", this.state.lang === "ar" ? "rtl" : "ltr");
      this.updateStaticTranslations();
    },

    setLanguage(newLang) {
      if (this.state.lang === newLang) return;
      this.state.lang = newLang;
      this.saveState("lang");
      this.initI18n();
      this.renderAll();
      this.updateCheckoutGovOptions();
      if (this.state.activeProduct) {
        this.renderProductModal(this.state.activeProduct);
      }
    },

    toggleLanguage() {
      this.setLanguage(this.state.lang === "ar" ? "en" : "ar");
    },

    updateStaticTranslations() {
      const elements = document.querySelectorAll("[data-i18n]");
      elements.forEach(el => {
        const key = el.getAttribute("data-i18n");
        el.textContent = this.t(key);
      });

      const placeholderEls = document.querySelectorAll("[data-i18n-placeholder]");
      placeholderEls.forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        el.setAttribute("placeholder", this.t(key));
      });

      const titleKey = this.state.lang === "ar" 
        ? "لوميير | أزياء نسائية فاخرة في مصر"
        : "Lumière | Modern Women's Boutique Egypt";
      document.title = titleKey;

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", this.t("tagline"));
      }

      // Update lang toggle label
      const langToggleLabel = document.getElementById("lang-toggle-text");
      if (langToggleLabel) {
        langToggleLabel.textContent = this.state.lang === "ar" ? "English" : "العربية";
      }
    },

    // Setup Cached DOM references
    setupDOM() {
      this.dom = {
        categoryChipsContainer: document.getElementById("category-chips-list"),
        newArrivalsContainer: document.getElementById("new-arrivals-list"),
        bestSellersContainer: document.getElementById("best-sellers-list"),
        catalogGrid: document.getElementById("catalog-grid"),
        catalogCount: document.getElementById("catalog-count-label"),
        catalogEmptyState: document.getElementById("catalog-empty-state"),
        loadMoreBtn: document.getElementById("load-more-btn"),
        allLoadedMsg: document.getElementById("all-loaded-msg"),
        activeFiltersContainer: document.getElementById("active-filters-container"),
        filterActivePill: document.getElementById("filter-active-pill"),
        cartBadge: document.getElementById("cart-count-badge"),
        favoritesBadge: document.getElementById("favorites-count-badge"),
        headerSearchInput: document.getElementById("header-search-input"),
        headerSearchClear: document.getElementById("search-clear-btn"),
        mobileSearchInput: document.getElementById("mobile-search-input"),
        mobileSearchClear: document.getElementById("mobile-search-clear-btn"),
        mobileSearchBar: document.getElementById("mobile-search-bar"),
        sortSelect: document.getElementById("sort-select"),
        // Drawers (Completely Separated)
        drawerOverlay: document.getElementById("drawer-overlay"),
        cartDrawer: document.getElementById("cart-drawer"),
        cartItemsList: document.getElementById("cart-items-list"),
        cartEmptyState: document.getElementById("cart-empty-state"),
        cartSubtotal: document.getElementById("cart-subtotal-val"),
        cartShipping: document.getElementById("cart-shipping-val"),
        cartTotal: document.getElementById("cart-total-val"),
        cartProgressWrap: document.getElementById("cart-shipping-progress"),
        cartProgressMsg: document.getElementById("shipping-progress-text"),
        cartProgressBar: document.getElementById("shipping-progress-fill"),
        favoritesDrawer: document.getElementById("favorites-drawer"),
        favoritesItemsList: document.getElementById("favorites-items-list"),
        favoritesEmptyState: document.getElementById("favorites-empty-state"),
        // Modals
        productModal: document.getElementById("product-modal"),
        sizeGuideModal: document.getElementById("size-guide-modal"),
        filterModal: document.getElementById("filter-modal"),
        checkoutModal: document.getElementById("checkout-modal"),
        toastContainer: document.getElementById("toast-container")
      };
    },

    // Event Listeners
    setupEventListeners() {
      // Language Switcher
      document.getElementById("lang-toggle-btn")?.addEventListener("click", () => this.toggleLanguage());

      // Announcement Bar Dismiss
      document.getElementById("announcement-close")?.addEventListener("click", () => {
        const bar = document.getElementById("announcement-bar");
        if (bar) bar.style.display = "none";
      });

      // Mobile Search Toggle
      document.getElementById("mobile-search-trigger")?.addEventListener("click", () => {
        if (this.dom.mobileSearchBar) {
          this.dom.mobileSearchBar.classList.toggle("active");
          if (this.dom.mobileSearchBar.classList.contains("active")) {
            this.dom.mobileSearchInput?.focus();
          }
        }
      });

      // Search Inputs (Debounced 250ms)
      const handleSearch = this.debounce((query) => {
        this.state.filters.search = query.trim();
        this.state.pagination.page = 1;
        this.renderCatalog();
        this.renderActiveFilterChips();
        if (this.dom.headerSearchClear) {
          this.dom.headerSearchClear.classList.toggle("active", Boolean(query));
        }
        if (this.dom.mobileSearchClear) {
          this.dom.mobileSearchClear.classList.toggle("active", Boolean(query));
        }
      }, 250);

      this.dom.headerSearchInput?.addEventListener("input", (e) => handleSearch(e.target.value));
      this.dom.mobileSearchInput?.addEventListener("input", (e) => handleSearch(e.target.value));

      this.dom.headerSearchClear?.addEventListener("click", () => {
        if (this.dom.headerSearchInput) this.dom.headerSearchInput.value = "";
        handleSearch("");
      });
      this.dom.mobileSearchClear?.addEventListener("click", () => {
        if (this.dom.mobileSearchInput) this.dom.mobileSearchInput.value = "";
        handleSearch("");
      });

      // Sort Select
      this.dom.sortSelect?.addEventListener("change", (e) => {
        this.state.filters.sort = e.target.value;
        this.state.pagination.page = 1;
        this.renderCatalog();
      });

      // Load More Button
      this.dom.loadMoreBtn?.addEventListener("click", () => {
        this.state.pagination.page += 1;
        this.renderCatalog(true);
      });

      // Drawers Triggers (Cleanly decoupled)
      document.getElementById("cart-trigger-btn")?.addEventListener("click", () => this.openCartDrawer());
      document.getElementById("favorites-trigger-btn")?.addEventListener("click", () => this.openFavoritesDrawer());
      document.getElementById("cart-drawer-close")?.addEventListener("click", () => this.closeCartDrawer());
      document.getElementById("favorites-drawer-close")?.addEventListener("click", () => this.closeFavoritesDrawer());
      this.dom.drawerOverlay?.addEventListener("click", () => this.closeDrawers());

      // Filter Drawer Trigger
      document.getElementById("filter-trigger-btn")?.addEventListener("click", () => this.openFilterModal());
      document.getElementById("filter-modal-close")?.addEventListener("click", () => this.closeModal("filterModal"));

      // Size Guide Trigger from footer/modal
      document.querySelectorAll(".size-guide-open").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          this.openSizeGuideModal();
        });
      });
      document.getElementById("size-guide-close")?.addEventListener("click", () => this.closeModal("sizeGuideModal"));

      // Checkout Triggers
      document.getElementById("cart-checkout-btn")?.addEventListener("click", () => {
        this.closeDrawers();
        this.openCheckoutModal();
      });
      document.getElementById("checkout-modal-close")?.addEventListener("click", () => this.closeModal("checkoutModal"));

      // Floating WhatsApp General Chat
      document.getElementById("floating-whatsapp-btn")?.addEventListener("click", () => {
        this.openGeneralWhatsAppChat();
      });

      // Modal overlays click outside
      document.querySelectorAll(".modal-overlay").forEach(overlay => {
        overlay.addEventListener("click", (e) => {
          if (e.target === overlay) {
            overlay.classList.remove("active");
            document.body.style.overflow = "";
          }
        });
      });

      // Product modal close
      document.getElementById("product-modal-close")?.addEventListener("click", () => this.closeModal("productModal"));

      // Esc key to close all modals and drawers
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          this.closeAllOverlays();
        }
      });

      // Cross-tab synchronization via storage event
      window.addEventListener("storage", (e) => {
        if (e.key === STORAGE_KEYS.CART) {
          try {
            const raw = localStorage.getItem(STORAGE_KEYS.CART);
            this.state.cart = raw ? JSON.parse(raw) : [];
            this.updateBadges();
            this.renderCartDrawer();
          } catch (err) {
            console.warn("Storage sync cart error:", err);
          }
        } else if (e.key === STORAGE_KEYS.FAVORITES) {
          try {
            const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
            this.state.favorites = raw ? JSON.parse(raw) : [];
            this.updateBadges();
            this.renderFavoritesDrawer();
            this.updateCardFavoriteButtons();
          } catch (err) {
            console.warn("Storage sync favorites error:", err);
          }
        } else if (e.key === STORAGE_KEYS.LANG) {
          const newLang = localStorage.getItem(STORAGE_KEYS.LANG);
          if (newLang && newLang !== this.state.lang) {
            this.setLanguage(newLang);
          }
        }
      });

      // Checkout form handlers
      this.setupCheckoutHandlers();
    },

    // Debounce Utility
    debounce(fn, delay) {
      let timer = null;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
      };
    },

    // Render Master
    renderAll() {
      this.renderCategoryChips();
      this.renderCuratedSections();
      this.renderCatalog();
      this.renderActiveFilterChips();
      this.updateBadges();
      this.renderCartDrawer();
      this.renderFavoritesDrawer();
      this.renderSizeGuideTable();
    },

    // Badges Counters
    updateBadges() {
      const cartTotalCount = this.state.cart.reduce((sum, item) => sum + item.qty, 0);
      if (this.dom.cartBadge) {
        this.dom.cartBadge.textContent = cartTotalCount;
        this.dom.cartBadge.classList.toggle("visible", cartTotalCount > 0);
      }

      const favoritesCount = this.state.favorites.length;
      if (this.dom.favoritesBadge) {
        this.dom.favoritesBadge.textContent = favoritesCount;
        this.dom.favoritesBadge.classList.toggle("visible", favoritesCount > 0);
      }
    },

    bumpCartBadge() {
      if (this.dom.cartBadge) {
        this.dom.cartBadge.classList.remove("badge-bump");
        void this.dom.cartBadge.offsetWidth;
        this.dom.cartBadge.classList.add("badge-bump");
      }
    },

    // 1. Render Categories Horizontal Chips
    renderCategoryChips() {
      if (!this.dom.categoryChipsContainer) return;
      const isArabic = this.state.lang === "ar";
      const fragment = document.createDocumentFragment();

      CATEGORIES.forEach(cat => {
        const count = cat.id === "all" 
          ? PRODUCTS.length 
          : PRODUCTS.filter(p => p.category === cat.id).length;

        const chip = document.createElement("button");
        chip.className = `category-chip ${this.state.filters.category === cat.id ? "active" : ""}`;
        chip.setAttribute("type", "button");
        chip.innerHTML = `
          <span>${isArabic ? cat.name_ar : cat.name_en}</span>
          <span class="category-chip-count">${count}</span>
        `;
        chip.addEventListener("click", () => {
          this.state.filters.category = cat.id;
          this.state.pagination.page = 1;
          this.renderCategoryChips();
          this.renderCatalog();
          this.renderActiveFilterChips();
        });
        fragment.appendChild(chip);
      });

      this.dom.categoryChipsContainer.innerHTML = "";
      this.dom.categoryChipsContainer.appendChild(fragment);
    },

    // 2. Curated Sections: New Arrivals & Best Sellers
    renderCuratedSections() {
      if (this.dom.newArrivalsContainer) {
        const newProducts = PRODUCTS.filter(p => p.badge === "new").slice(0, 4);
        this.dom.newArrivalsContainer.innerHTML = "";
        const fragment = document.createDocumentFragment();
        newProducts.forEach(product => {
          fragment.appendChild(this.createProductCard(product));
        });
        this.dom.newArrivalsContainer.appendChild(fragment);
      }

      if (this.dom.bestSellersContainer) {
        const bestProducts = PRODUCTS.filter(p => p.badge === "best" || p.rating >= 4.9).slice(0, 4);
        this.dom.bestSellersContainer.innerHTML = "";
        const fragment = document.createDocumentFragment();
        bestProducts.forEach(product => {
          fragment.appendChild(this.createProductCard(product));
        });
        this.dom.bestSellersContainer.appendChild(fragment);
      }
    },

    // 3. Create Arched Product Card Element (Single source of truth for images)
    createProductCard(product) {
      const isArabic = this.state.lang === "ar";
      const name = isArabic ? product.name_ar : product.name_en;
      const categoryObj = CATEGORIES.find(c => c.id === product.category);
      const categoryName = categoryObj ? (isArabic ? categoryObj.name_ar : categoryObj.name_en) : "";
      const isFav = this.state.favorites.includes(product.id);

      const card = document.createElement("article");
      card.className = "product-card fade-reveal";
      card.setAttribute("data-product-id", product.id);

      // Badge HTML
      let badgeHtml = "";
      if (product.badge === "best") {
        badgeHtml = `<span class="product-badge badge-best">${this.t("badgeBest")}</span>`;
      } else if (product.badge === "sale") {
        badgeHtml = `<span class="product-badge badge-sale">${this.t("badgeSale")}</span>`;
      } else if (product.badge === "new") {
        badgeHtml = `<span class="product-badge badge-new">${this.t("badgeNew")}</span>`;
      }

      // Price HTML with discount calculation
      let priceHtml = `<span class="price-current">${this.formatCurrency(product.price)}</span>`;
      if (product.oldPrice && product.oldPrice > product.price) {
        const discountPct = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
        priceHtml += `
          <span class="price-old">${this.formatCurrency(product.oldPrice)}</span>
          <span class="price-discount-tag">-${discountPct}%</span>
        `;
      }

      // Swatches preview
      let swatchesHtml = "";
      if (product.colors && product.colors.length) {
        const maxShown = 3;
        const shownColors = product.colors.slice(0, maxShown);
        const dots = shownColors.map(c => `<span class="swatch-dot" style="background-color: ${c.hex};" title="${isArabic ? c.name_ar : c.name_en}"></span>`).join("");
        const more = product.colors.length > maxShown ? `<span class="swatches-more">+${product.colors.length - maxShown}</span>` : "";
        swatchesHtml = `<div class="product-swatches">${dots}${more}</div>`;
      }

      // Single source of truth: images[0] is primary, images[1] is hover
      const primaryImgSrc = resolveImage(product.images[0], product.id, 0);
      const secondaryImgSrc = resolveImage(product.images[1] || product.images[0], product.id, 1);

      card.innerHTML = `
        <div class="product-media-wrap">
          ${badgeHtml}
          <button class="favorites-btn ${isFav ? "active" : ""}" type="button" aria-label="${this.t("favoritesTooltip")}" data-favorite-id="${product.id}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
          </button>
          <img class="product-img primary-img" 
               src="${primaryImgSrc}" 
               alt="${name}" 
               loading="lazy" 
               decoding="async" 
               width="400" 
               height="533" 
               onerror="handleImageError(this)" />
          <img class="product-img secondary-img" 
               src="${secondaryImgSrc}" 
               alt="${name} alternate" 
               loading="lazy" 
               decoding="async" 
               width="400" 
               height="533" 
               onerror="handleImageError(this)" />
          <button class="product-quick-btn" type="button" data-quickview-id="${product.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            <span>${this.t("quickView")}</span>
          </button>
        </div>
        <div class="product-info">
          <span class="product-category">${categoryName}</span>
          <h3 class="product-name" data-quickview-id="${product.id}">${name}</h3>
          ${swatchesHtml}
          <div class="product-price-box">
            ${priceHtml}
          </div>
          <div class="mobile-card-actions">
            <button class="btn-card-add" type="button" data-quickview-id="${product.id}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <span>${this.t("addToCart")}</span>
            </button>
          </div>
        </div>
      `;

      // Favorites toggle event
      const favBtn = card.querySelector(".favorites-btn");
      favBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggleFavorite(product.id);
      });

      // Quick View & Card click triggers
      card.querySelectorAll("[data-quickview-id]").forEach(el => {
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          this.openProductModal(product);
        });
      });

      return card;
    },

    updateCardFavoriteButtons() {
      document.querySelectorAll(".favorites-btn[data-favorite-id]").forEach(btn => {
        const id = btn.getAttribute("data-favorite-id");
        const isFav = this.state.favorites.includes(id);
        btn.classList.toggle("active", isFav);
        const svg = btn.querySelector("svg");
        if (svg) svg.setAttribute("fill", isFav ? "currentColor" : "none");
      });
    },

    // 4. Catalog Filtering & Sorting
    getFilteredProducts() {
      const { category, search, sort, minPrice, maxPrice, size, color, inStockOnly } = this.state.filters;

      return PRODUCTS.filter(p => {
        if (category !== "all" && p.category !== category) return false;
        if (inStockOnly && !p.inStock) return false;
        if (minPrice !== null && p.price < minPrice) return false;
        if (maxPrice !== null && p.price > maxPrice) return false;
        if (size && !p.sizes.some(s => s.toLowerCase().includes(size.toLowerCase()))) return false;
        if (color && !p.colors.some(c => c.hex.toLowerCase() === color.toLowerCase() || c.name_ar === color || c.name_en === color)) return false;

        if (search) {
          const q = search.toLowerCase();
          const matchAr = p.name_ar.toLowerCase().includes(q) || p.description_ar.toLowerCase().includes(q);
          const matchEn = p.name_en.toLowerCase().includes(q) || p.description_en.toLowerCase().includes(q);
          if (!matchAr && !matchEn) return false;
        }

        return true;
      }).sort((a, b) => {
        if (sort === "priceAsc") return a.price - b.price;
        if (sort === "priceDesc") return b.price - a.price;
        if (sort === "bestSeller") return (b.rating || 0) - (a.rating || 0);
        return (b.badge === "new" ? 1 : 0) - (a.badge === "new" ? 1 : 0);
      });
    },

    // Render Full Catalog Grid
    renderCatalog(append = false) {
      if (!this.dom.catalogGrid) return;
      const filtered = this.getFilteredProducts();
      const total = filtered.length;

      if (this.dom.catalogCount) {
        this.dom.catalogCount.textContent = this.t("showingResults", {
          count: Math.min(this.state.pagination.page * this.state.pagination.perPage, total),
          total: total
        });
      }

      if (total === 0) {
        this.dom.catalogGrid.innerHTML = "";
        if (this.dom.catalogEmptyState) this.dom.catalogEmptyState.style.display = "flex";
        if (this.dom.loadMoreBtn) this.dom.loadMoreBtn.style.display = "none";
        if (this.dom.allLoadedMsg) this.dom.allLoadedMsg.style.display = "none";
        return;
      } else {
        if (this.dom.catalogEmptyState) this.dom.catalogEmptyState.style.display = "none";
      }

      const visibleCount = this.state.pagination.page * this.state.pagination.perPage;
      const visibleProducts = filtered.slice(0, visibleCount);

      if (!append) {
        this.dom.catalogGrid.innerHTML = "";
      }

      const fragment = document.createDocumentFragment();
      const startIndex = append ? (this.state.pagination.page - 1) * this.state.pagination.perPage : 0;
      const sliceToRender = visibleProducts.slice(startIndex);

      sliceToRender.forEach(p => {
        fragment.appendChild(this.createProductCard(p));
      });

      this.dom.catalogGrid.appendChild(fragment);

      if (visibleCount >= total) {
        if (this.dom.loadMoreBtn) this.dom.loadMoreBtn.style.display = "none";
        if (this.dom.allLoadedMsg) this.dom.allLoadedMsg.style.display = "block";
      } else {
        if (this.dom.loadMoreBtn) this.dom.loadMoreBtn.style.display = "inline-flex";
        if (this.dom.allLoadedMsg) this.dom.allLoadedMsg.style.display = "none";
      }

      this.initScrollReveals();
    },

    // Active Filter Chips Bar
    renderActiveFilterChips() {
      if (!this.dom.activeFiltersContainer) return;
      const { category, search, minPrice, maxPrice, size, color, inStockOnly } = this.state.filters;
      const isArabic = this.state.lang === "ar";
      let activeCount = 0;
      const tags = [];

      if (category !== "all") {
        activeCount++;
        const catObj = CATEGORIES.find(c => c.id === category);
        const name = catObj ? (isArabic ? catObj.name_ar : catObj.name_en) : category;
        tags.push({ label: `${this.t("filterCategory")}: ${name}`, key: "category", val: "all" });
      }

      if (search) {
        activeCount++;
        tags.push({ label: `"${search}"`, key: "search", val: "" });
      }

      if (minPrice || maxPrice) {
        activeCount++;
        tags.push({ label: `${minPrice || 0} - ${maxPrice || "max"} ${isArabic ? "ج.م" : "EGP"}`, key: "price", val: null });
      }

      if (size) {
        activeCount++;
        tags.push({ label: `${this.t("filterSize")}: ${size}`, key: "size", val: "" });
      }

      if (color) {
        activeCount++;
        tags.push({ label: `${this.t("filterColor")}`, key: "color", val: "" });
      }

      if (inStockOnly) {
        activeCount++;
        tags.push({ label: this.t("filterStock"), key: "inStockOnly", val: false });
      }

      if (this.dom.filterActivePill) {
        this.dom.filterActivePill.textContent = activeCount;
        this.dom.filterActivePill.classList.toggle("visible", activeCount > 0);
      }

      if (tags.length === 0) {
        this.dom.activeFiltersContainer.innerHTML = "";
        return;
      }

      const html = tags.map(t => `
        <span class="filter-tag">
          <span>${t.label}</span>
          <span class="filter-tag-close" data-clear-key="${t.key}" data-clear-val="${t.val}">✕</span>
        </span>
      `).join("") + `<button type="button" class="clear-all-link" id="clear-all-filters-btn">${this.t("clearFilters")}</button>`;

      this.dom.activeFiltersContainer.innerHTML = html;

      this.dom.activeFiltersContainer.querySelectorAll(".filter-tag-close").forEach(el => {
        el.addEventListener("click", () => {
          const key = el.getAttribute("data-clear-key");
          if (key === "price") {
            this.state.filters.minPrice = null;
            this.state.filters.maxPrice = null;
          } else {
            this.state.filters[key] = el.getAttribute("data-clear-val") === "false" ? false : el.getAttribute("data-clear-val");
          }
          this.state.pagination.page = 1;
          this.renderCategoryChips();
          this.renderCatalog();
          this.renderActiveFilterChips();
        });
      });

      document.getElementById("clear-all-filters-btn")?.addEventListener("click", () => {
        this.resetAllFilters();
      });
    },

    resetAllFilters() {
      this.state.filters = {
        category: "all",
        search: "",
        sort: "newest",
        minPrice: null,
        maxPrice: null,
        size: "",
        color: "",
        inStockOnly: false
      };
      if (this.dom.headerSearchInput) this.dom.headerSearchInput.value = "";
      if (this.dom.mobileSearchInput) this.dom.mobileSearchInput.value = "";
      if (this.dom.sortSelect) this.dom.sortSelect.value = "newest";
      this.state.pagination.page = 1;
      this.renderCategoryChips();
      this.renderCatalog();
      this.renderActiveFilterChips();
    },

    // 5. Product Quick View / Detail Modal (Always matches card image)
    openProductModal(product) {
      this.state.activeProduct = product;
      this.state.selectedDetailVariant = {
        color: product.colors[0] || null,
        size: product.sizes.length === 1 ? product.sizes[0] : null,
        quantity: 1
      };
      this.renderProductModal(product);
      this.openModal("productModal");
    },

    renderProductModal(product) {
      const isArabic = this.state.lang === "ar";
      const name = isArabic ? product.name_ar : product.name_en;
      const desc = isArabic ? product.description_ar : product.description_en;
      const categoryObj = CATEGORIES.find(c => c.id === product.category);
      const catName = categoryObj ? (isArabic ? categoryObj.name_ar : categoryObj.name_en) : "";

      // Single source of truth: Gallery uses the same exact images as card
      const primaryUrl = resolveImage(product.images[0], product.id, 0);
      const mainImg = document.getElementById("pdetail-main-image");
      if (mainImg) {
        mainImg.src = primaryUrl;
        mainImg.alt = name;
        mainImg.onerror = () => { handleImageError(mainImg); };
      }

      // Thumbnails
      const thumbsContainer = document.getElementById("pdetail-thumbnails");
      if (thumbsContainer) {
        thumbsContainer.innerHTML = product.images.map((img, idx) => {
          const resolvedThumb = resolveImage(img, product.id, idx);
          return `
            <button class="pdetail-thumb-btn ${idx === 0 ? "active" : ""}" data-img-src="${resolvedThumb}" type="button">
              <img src="${resolvedThumb}" alt="Angle ${idx + 1}" onerror="handleImageError(this)" />
            </button>
          `;
        }).join("");

        thumbsContainer.querySelectorAll(".pdetail-thumb-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            thumbsContainer.querySelectorAll(".pdetail-thumb-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            if (mainImg) mainImg.src = btn.getAttribute("data-img-src");
          });
        });
      }

      // Meta info
      document.getElementById("pdetail-category-label").textContent = catName;
      document.getElementById("pdetail-title-text").textContent = name;
      document.getElementById("pdetail-desc-text").textContent = desc;
      document.getElementById("pdetail-price-text").textContent = this.formatCurrency(product.price);

      const ratingCount = document.getElementById("pdetail-reviews-count");
      if (ratingCount) {
        ratingCount.textContent = this.t("ratingReviews", { count: product.reviewsCount || 24 });
      }

      // Old price
      const oldPriceEl = document.getElementById("pdetail-oldprice-text");
      if (oldPriceEl) {
        if (product.oldPrice) {
          oldPriceEl.textContent = this.formatCurrency(product.oldPrice);
          oldPriceEl.style.display = "inline";
        } else {
          oldPriceEl.style.display = "none";
        }
      }

      // Render Colors
      const colorsContainer = document.getElementById("pdetail-colors-list");
      const selectedColorLabel = document.getElementById("pdetail-selected-color-name");
      if (colorsContainer) {
        colorsContainer.innerHTML = product.colors.map((c, idx) => `
          <button class="swatch-btn ${idx === 0 ? "active" : ""}" 
                  style="background-color: ${c.hex};" 
                  data-color-index="${idx}" 
                  title="${isArabic ? c.name_ar : c.name_en}" 
                  type="button">
          </button>
        `).join("");

        if (selectedColorLabel && product.colors[0]) {
          selectedColorLabel.textContent = isArabic ? product.colors[0].name_ar : product.colors[0].name_en;
        }

        colorsContainer.querySelectorAll(".swatch-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            colorsContainer.querySelectorAll(".swatch-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const colorIdx = parseInt(btn.getAttribute("data-color-index"), 10);
            const chosen = product.colors[colorIdx];
            this.state.selectedDetailVariant.color = chosen;
            if (selectedColorLabel) {
              selectedColorLabel.textContent = isArabic ? chosen.name_ar : chosen.name_en;
            }
          });
        });
      }

      // Render Sizes
      const sizesContainer = document.getElementById("pdetail-sizes-list");
      const selectedSizeLabel = document.getElementById("pdetail-selected-size-name");
      if (sizesContainer) {
        sizesContainer.innerHTML = product.sizes.map((s) => `
          <button class="size-chip-btn ${this.state.selectedDetailVariant.size === s ? "active" : ""}" 
                  data-size-val="${s}" 
                  type="button">
            ${s}
          </button>
        `).join("");

        if (selectedSizeLabel) {
          selectedSizeLabel.textContent = this.state.selectedDetailVariant.size || "";
        }

        sizesContainer.querySelectorAll(".size-chip-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            sizesContainer.querySelectorAll(".size-chip-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const val = btn.getAttribute("data-size-val");
            this.state.selectedDetailVariant.size = val;
            if (selectedSizeLabel) selectedSizeLabel.textContent = val;
          });
        });
      }

      // Quantity Stepper
      const qtyInput = document.getElementById("pdetail-qty-input");
      if (qtyInput) qtyInput.value = "1";
      this.state.selectedDetailVariant.quantity = 1;

      document.getElementById("pdetail-qty-minus")?.replaceWith(
        document.getElementById("pdetail-qty-minus").cloneNode(true)
      );
      document.getElementById("pdetail-qty-plus")?.replaceWith(
        document.getElementById("pdetail-qty-plus").cloneNode(true)
      );

      document.getElementById("pdetail-qty-minus")?.addEventListener("click", () => {
        let q = parseInt(qtyInput.value, 10) || 1;
        if (q > 1) {
          q--;
          qtyInput.value = q;
          this.state.selectedDetailVariant.quantity = q;
        }
      });

      document.getElementById("pdetail-qty-plus")?.addEventListener("click", () => {
        let q = parseInt(qtyInput.value, 10) || 1;
        if (q < 10) {
          q++;
          qtyInput.value = q;
          this.state.selectedDetailVariant.quantity = q;
        }
      });

      // Add to Bag Button
      const modalAddBtn = document.getElementById("pdetail-add-cart-btn");
      if (modalAddBtn) {
        modalAddBtn.replaceWith(modalAddBtn.cloneNode(true));
        document.getElementById("pdetail-add-cart-btn")?.addEventListener("click", () => {
          if (!this.state.selectedDetailVariant.size) {
            this.showToast(this.t("selectSizePrompt"), "warning");
            return;
          }
          const chosenColor = this.state.selectedDetailVariant.color;
          const colorName = chosenColor ? (isArabic ? chosenColor.name_ar : chosenColor.name_en) : "";

          this.addToCart(
            product.id,
            this.state.selectedDetailVariant.size,
            colorName,
            this.state.selectedDetailVariant.quantity
          );
          this.closeModal("productModal");
          this.openCartDrawer();
        });
      }
    },

    // 6. Cart Management (Lightweight records: { productId, size, color, qty })
    addToCart(productId, size, color, qty = 1) {
      const product = PRODUCTS.find(p => p.id === productId);
      if (!product) return;

      const existingIndex = this.state.cart.findIndex(item => 
        item.productId === productId && 
        item.size === size && 
        item.color === color
      );

      if (existingIndex > -1) {
        this.state.cart[existingIndex].qty += qty;
      } else {
        this.state.cart.push({
          productId: productId,
          size: size,
          color: color,
          qty: qty
        });
      }

      this.saveState("cart");
      this.updateBadges();
      this.bumpCartBadge();
      this.renderCartDrawer();
      this.showToast(this.t("addedToCart"));
    },

    updateCartItemQuantity(index, delta) {
      if (!this.state.cart[index]) return;
      this.state.cart[index].qty += delta;
      if (this.state.cart[index].qty <= 0) {
        this.state.cart.splice(index, 1);
      }
      this.saveState("cart");
      this.updateBadges();
      this.renderCartDrawer();
    },

    removeFromCart(index) {
      this.state.cart.splice(index, 1);
      this.saveState("cart");
      this.updateBadges();
      this.renderCartDrawer();
    },

    getCartSubtotal() {
      return this.state.cart.reduce((sum, item) => {
        const prod = PRODUCTS.find(p => p.id === item.productId);
        return sum + (prod ? prod.price * item.qty : 0);
      }, 0);
    },

    // Render Cart Drawer
    renderCartDrawer() {
      if (!this.dom.cartItemsList) return;
      const isArabic = this.state.lang === "ar";
      const subtotal = this.getCartSubtotal();
      const threshold = STORE_CONFIG.freeShippingThreshold;

      if (this.state.cart.length === 0) {
        this.dom.cartItemsList.innerHTML = "";
        if (this.dom.cartEmptyState) this.dom.cartEmptyState.style.display = "flex";
        if (this.dom.cartProgressWrap) this.dom.cartProgressWrap.style.display = "none";
        if (this.dom.cartSubtotal) this.dom.cartSubtotal.textContent = this.formatCurrency(0);
        if (this.dom.cartShipping) this.dom.cartShipping.textContent = this.t("shippingAtCheckout");
        if (this.dom.cartTotal) this.dom.cartTotal.textContent = this.formatCurrency(0);
        document.getElementById("cart-checkout-btn")?.setAttribute("disabled", "true");
        return;
      }

      if (this.dom.cartEmptyState) this.dom.cartEmptyState.style.display = "none";
      if (this.dom.cartProgressWrap) this.dom.cartProgressWrap.style.display = "block";
      document.getElementById("cart-checkout-btn")?.removeAttribute("disabled");

      // Free shipping progress bar
      if (subtotal >= threshold) {
        if (this.dom.cartProgressMsg) this.dom.cartProgressMsg.textContent = this.t("freeShippingQualified");
        if (this.dom.cartProgressBar) this.dom.cartProgressBar.style.width = "100%";
      } else {
        const remaining = threshold - subtotal;
        if (this.dom.cartProgressMsg) {
          this.dom.cartProgressMsg.textContent = this.t("freeShippingRemaining", {
            amount: this.formatCurrency(remaining)
          });
        }
        const pct = Math.min(Math.round((subtotal / threshold) * 100), 100);
        if (this.dom.cartProgressBar) this.dom.cartProgressBar.style.width = `${pct}%`;
      }

      // Render Items
      const fragment = document.createDocumentFragment();
      this.state.cart.forEach((item, index) => {
        const prod = PRODUCTS.find(p => p.id === item.productId);
        if (!prod) return;

        const name = isArabic ? prod.name_ar : prod.name_en;
        const lineImg = resolveImage(prod.images[0], prod.id, 0);
        const lineTotal = prod.price * item.qty;

        const itemEl = document.createElement("div");
        itemEl.className = "drawer-item";
        itemEl.innerHTML = `
          <img src="${lineImg}" alt="${name}" class="drawer-item-img" onerror="handleImageError(this)" />
          <div class="drawer-item-details">
            <h4 class="drawer-item-title">${name}</h4>
            <div class="drawer-item-variant">
              <span>${this.t("sizeLabel")} ${item.size}</span>
              ${item.color ? ` • <span>${this.t("colorLabel")} ${item.color}</span>` : ""}
            </div>
            <div class="drawer-item-price">${this.formatCurrency(lineTotal)}</div>
            <div class="drawer-item-controls">
              <div class="qty-stepper">
                <button type="button" class="qty-btn" data-cart-minus="${index}">-</button>
                <span class="qty-input">${item.qty}</span>
                <button type="button" class="qty-btn" data-cart-plus="${index}">+</button>
              </div>
              <button type="button" class="drawer-item-remove" data-cart-remove="${index}">${this.t("removeItem")}</button>
            </div>
          </div>
        `;

        itemEl.querySelector(`[data-cart-minus="${index}"]`).addEventListener("click", () => this.updateCartItemQuantity(index, -1));
        itemEl.querySelector(`[data-cart-plus="${index}"]`).addEventListener("click", () => this.updateCartItemQuantity(index, 1));
        itemEl.querySelector(`[data-cart-remove="${index}"]`).addEventListener("click", () => this.removeFromCart(index));

        fragment.appendChild(itemEl);
      });

      this.dom.cartItemsList.innerHTML = "";
      this.dom.cartItemsList.appendChild(fragment);

      if (this.dom.cartSubtotal) this.dom.cartSubtotal.textContent = this.formatCurrency(subtotal);
      if (this.dom.cartShipping) {
        this.dom.cartShipping.textContent = subtotal >= threshold ? this.t("shippingFree") : this.t("shippingAtCheckout");
      }
      if (this.dom.cartTotal) {
        this.dom.cartTotal.textContent = this.formatCurrency(subtotal);
      }
    },

    // 7. Favorites Management (Completely Separate from Cart)
    toggleFavorite(productId) {
      const idx = this.state.favorites.indexOf(productId);
      if (idx > -1) {
        this.state.favorites.splice(idx, 1);
        this.showToast(this.t("removedFromFavorites"));
      } else {
        this.state.favorites.push(productId);
        this.showToast(this.t("addedToFavorites"));
      }
      this.saveState("favorites");
      this.updateBadges();
      this.updateCardFavoriteButtons();
      this.renderFavoritesDrawer();
    },

    renderFavoritesDrawer() {
      if (!this.dom.favoritesItemsList) return;
      const isArabic = this.state.lang === "ar";

      if (this.state.favorites.length === 0) {
        this.dom.favoritesItemsList.innerHTML = "";
        if (this.dom.favoritesEmptyState) this.dom.favoritesEmptyState.style.display = "flex";
        return;
      }

      if (this.dom.favoritesEmptyState) this.dom.favoritesEmptyState.style.display = "none";
      const fragment = document.createDocumentFragment();

      this.state.favorites.forEach(id => {
        const product = PRODUCTS.find(p => p.id === id);
        if (!product) return;

        const name = isArabic ? product.name_ar : product.name_en;
        const lineImg = resolveImage(product.images[0], product.id, 0);

        const itemEl = document.createElement("div");
        itemEl.className = "drawer-item";
        itemEl.innerHTML = `
          <img src="${lineImg}" alt="${name}" class="drawer-item-img" onerror="handleImageError(this)" />
          <div class="drawer-item-details">
            <h4 class="drawer-item-title">${name}</h4>
            <div class="drawer-item-price">${this.formatCurrency(product.price)}</div>
            <div class="drawer-item-controls">
              <button type="button" class="btn-primary" style="padding: 6px 14px; font-size: 0.8rem; min-height: 36px;" data-fav-view="${product.id}">
                ${this.t("addToCart")}
              </button>
              <button type="button" class="drawer-item-remove" data-fav-remove="${product.id}">
                ${this.t("removeItem")}
              </button>
            </div>
          </div>
        `;

        itemEl.querySelector(`[data-fav-view="${product.id}"]`).addEventListener("click", () => {
          this.closeFavoritesDrawer();
          this.openProductModal(product);
        });

        itemEl.querySelector(`[data-fav-remove="${product.id}"]`).addEventListener("click", () => {
          this.toggleFavorite(product.id);
        });

        fragment.appendChild(itemEl);
      });

      this.dom.favoritesItemsList.innerHTML = "";
      this.dom.favoritesItemsList.appendChild(fragment);
    },

    // Drawer Open / Close Functions (Strictly Independent)
    openCartDrawer() {
      // 1. Close favorites drawer first
      this.closeFavoritesDrawer();

      // 2. Validate container and render cart BEFORE adding open classes
      const itemsList = document.getElementById("cart-items-list");
      if (!itemsList) {
        console.error("Cart container #cart-items-list is missing in DOM");
      }
      try {
        this.renderCartDrawer();
      } catch (err) {
        console.error("Error executing renderCartDrawer:", err);
      }

      // 3. Add open classes
      const drawer = this.dom.cartDrawer || document.getElementById("cart-drawer");
      if (!drawer) {
        console.error("Cart drawer #cart-drawer is missing in DOM");
      } else {
        drawer.classList.add("is-open", "active");
      }

      const overlay = this.dom.drawerOverlay || document.getElementById("drawer-overlay");
      if (overlay) {
        overlay.classList.add("is-open", "active");
      }
      document.body.style.overflow = "hidden";
    },

    closeCartDrawer() {
      const drawer = this.dom.cartDrawer || document.getElementById("cart-drawer");
      if (drawer) {
        drawer.classList.remove("is-open", "active");
      }
      const favDrawer = this.dom.favoritesDrawer || document.getElementById("favorites-drawer");
      const isFavOpen = favDrawer && (favDrawer.classList.contains("is-open") || favDrawer.classList.contains("active"));
      if (!isFavOpen) {
        const overlay = this.dom.drawerOverlay || document.getElementById("drawer-overlay");
        if (overlay) overlay.classList.remove("is-open", "active");
        document.body.style.overflow = "";
      }
    },

    openFavoritesDrawer() {
      // 1. Close cart drawer first
      this.closeCartDrawer();

      // 2. Validate container and render favorites BEFORE adding open classes
      const itemsList = document.getElementById("favorites-items-list");
      if (!itemsList) {
        console.error("Favorites container #favorites-items-list is missing in DOM");
      }
      try {
        this.renderFavoritesDrawer();
      } catch (err) {
        console.error("Error executing renderFavoritesDrawer:", err);
      }

      // 3. Add open classes
      const drawer = this.dom.favoritesDrawer || document.getElementById("favorites-drawer");
      if (!drawer) {
        console.error("Favorites drawer #favorites-drawer is missing in DOM");
      } else {
        drawer.classList.add("is-open", "active");
      }

      const overlay = this.dom.drawerOverlay || document.getElementById("drawer-overlay");
      if (overlay) {
        overlay.classList.add("is-open", "active");
      }
      document.body.style.overflow = "hidden";
    },

    closeFavoritesDrawer() {
      const drawer = this.dom.favoritesDrawer || document.getElementById("favorites-drawer");
      if (drawer) {
        drawer.classList.remove("is-open", "active");
      }
      const cartDrawer = this.dom.cartDrawer || document.getElementById("cart-drawer");
      const isCartOpen = cartDrawer && (cartDrawer.classList.contains("is-open") || cartDrawer.classList.contains("active"));
      if (!isCartOpen) {
        const overlay = this.dom.drawerOverlay || document.getElementById("drawer-overlay");
        if (overlay) overlay.classList.remove("is-open", "active");
        document.body.style.overflow = "";
      }
    },

    closeDrawers() {
      const cartDrawer = this.dom.cartDrawer || document.getElementById("cart-drawer");
      if (cartDrawer) cartDrawer.classList.remove("is-open", "active");
      const favDrawer = this.dom.favoritesDrawer || document.getElementById("favorites-drawer");
      if (favDrawer) favDrawer.classList.remove("is-open", "active");
      const overlay = this.dom.drawerOverlay || document.getElementById("drawer-overlay");
      if (overlay) overlay.classList.remove("is-open", "active");
      document.body.style.overflow = "";
    },

    // 8. Size Guide Modal Table
    renderSizeGuideTable() {
      const container = document.getElementById("size-guide-table-body");
      if (!container) return;
      container.innerHTML = SIZE_GUIDE_DATA.map(row => `
        <tr>
          <td style="font-weight: 700;">${row.size}</td>
          <td>${row.bust}</td>
          <td>${row.waist}</td>
          <td>${row.hips}</td>
        </tr>
      `).join("");
    },

    // 9. Mobile Filters Drawer Modal
    openFilterModal() {
      this.renderFilterModalInputs();
      this.openModal("filterModal");
    },

    renderFilterModalInputs() {
      const isArabic = this.state.lang === "ar";
      const { category, minPrice, maxPrice, inStockOnly } = this.state.filters;

      const catContainer = document.getElementById("filter-categories-container");
      if (catContainer) {
        catContainer.innerHTML = CATEGORIES.map(cat => `
          <button type="button" class="category-chip ${category === cat.id ? "active" : ""}" data-filter-cat="${cat.id}">
            ${isArabic ? cat.name_ar : cat.name_en}
          </button>
        `).join("");

        catContainer.querySelectorAll("[data-filter-cat]").forEach(btn => {
          btn.addEventListener("click", () => {
            catContainer.querySelectorAll("[data-filter-cat]").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
          });
        });
      }

      const minInput = document.getElementById("filter-min-price");
      const maxInput = document.getElementById("filter-max-price");
      if (minInput) minInput.value = minPrice || "";
      if (maxInput) maxInput.value = maxPrice || "";

      const stockCheckbox = document.getElementById("filter-stock-only");
      if (stockCheckbox) stockCheckbox.checked = inStockOnly;

      const applyBtn = document.getElementById("apply-filters-btn");
      if (applyBtn) {
        applyBtn.replaceWith(applyBtn.cloneNode(true));
        document.getElementById("apply-filters-btn").addEventListener("click", () => {
          const activeCatBtn = catContainer?.querySelector(".category-chip.active");
          if (activeCatBtn) {
            this.state.filters.category = activeCatBtn.getAttribute("data-filter-cat");
          }
          const minVal = parseFloat(minInput?.value);
          const maxVal = parseFloat(maxInput?.value);
          this.state.filters.minPrice = isNaN(minVal) ? null : minVal;
          this.state.filters.maxPrice = isNaN(maxVal) ? null : maxVal;
          this.state.filters.inStockOnly = Boolean(stockCheckbox?.checked);
          this.state.pagination.page = 1;

          this.renderCategoryChips();
          this.renderCatalog();
          this.renderActiveFilterChips();
          this.closeModal("filterModal");
        });
      }

      const resetBtn = document.getElementById("reset-filters-btn");
      if (resetBtn) {
        resetBtn.replaceWith(resetBtn.cloneNode(true));
        document.getElementById("reset-filters-btn").addEventListener("click", () => {
          this.resetAllFilters();
          this.closeModal("filterModal");
        });
      }
    },

    // 10. Multi-Step Checkout System
    openCheckoutModal() {
      if (this.state.cart.length === 0) {
        this.showToast(this.t("emptyCartTitle"), "warning");
        return;
      }
      this.state.checkout.step = 1;
      this.updateCheckoutGovOptions();
      this.renderCheckoutStep();
      this.openModal("checkoutModal");
    },

    updateCheckoutGovOptions() {
      const select = document.getElementById("checkout-gov-select");
      if (!select) return;
      const isArabic = this.state.lang === "ar";
      const currentSelected = select.value;

      select.innerHTML = `<option value="">${this.t("selectGovPrompt")}</option>` +
        GOVERNORATES.map(gov => `
          <option value="${gov.id}" ${currentSelected === gov.id ? "selected" : ""}>
            ${isArabic ? gov.name_ar : gov.name_en} (${gov.fee} ${isArabic ? "ج.م" : "EGP"})
          </option>
        `).join("");
    },

    renderCheckoutStep() {
      const step1View = document.getElementById("checkout-step-1");
      const step1Footer = document.getElementById("checkout-step1-footer");
      const successView = document.getElementById("checkout-success-view");

      if (step1View) step1View.style.display = "block";
      if (step1Footer) step1Footer.style.display = "flex";
      if (successView) successView.style.display = "none";

      const node1 = document.getElementById("step-node-1");
      const node2 = document.getElementById("step-node-2");
      const line1 = document.getElementById("step-line-1");
      if (node1) {
        node1.classList.add("active");
        node1.classList.remove("completed");
      }
      if (node2) {
        node2.classList.remove("active", "completed");
      }
      if (line1) {
        line1.classList.remove("completed");
      }

      this.updateLiveShippingDisplay();
    },

    setupCheckoutHandlers() {
      const sameAsMobileCheck = document.getElementById("checkout-same-as-mobile");
      const whatsappGroup = document.getElementById("checkout-whatsapp-group");
      sameAsMobileCheck?.addEventListener("change", (e) => {
        if (whatsappGroup) {
          whatsappGroup.style.display = e.target.checked ? "none" : "flex";
        }
      });

      const govSelect = document.getElementById("checkout-gov-select");
      govSelect?.addEventListener("change", (e) => {
        const govId = e.target.value;
        const gov = GOVERNORATES.find(g => g.id === govId);
        this.state.checkout.governorate = gov || null;
        this.updateLiveShippingDisplay();
      });

      // Submit Order and direct launch to WhatsApp
      const handleDirectSubmit = () => {
        if (!this.validateStep1()) {
          const firstInvalid = document.querySelector("#checkout-step-1 .is-invalid");
          if (firstInvalid) {
            firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
            firstInvalid.focus();
          }
          this.showToast(this.state.lang === "ar" ? "يرجى استكمال البيانات المطلوبة باللون الأحمر" : "Please complete the required fields highlighted in red", "warning");
          return;
        }
        this.finalizeOrderAndLaunchWhatsApp();
      };

      document.getElementById("checkout-step1-next")?.addEventListener("click", handleDirectSubmit);
      document.getElementById("checkout-confirm-whatsapp-btn")?.addEventListener("click", handleDirectSubmit);

      document.getElementById("success-open-whatsapp-again")?.addEventListener("click", () => {
        if (this.state.lastCreatedOrder) {
          window.open(this.state.lastCreatedOrder.whatsappUrl, "_blank");
        }
      });

      // Clear cart ONLY after completing or closing the order success screen
      document.getElementById("success-finish-btn")?.addEventListener("click", () => {
        this.state.cart = [];
        this.saveState("cart");
        this.updateBadges();
        this.renderCartDrawer();
        this.closeModal("checkoutModal");
      });
    },

    updateLiveShippingDisplay() {
      const card = document.getElementById("checkout-shipping-calc-card");
      const priceEl = document.getElementById("checkout-shipping-calc-val");
      const daysEl = document.getElementById("checkout-shipping-calc-days");

      const subtotal = this.getCartSubtotal();
      const gov = this.state.checkout.governorate;
      const isFree = subtotal >= STORE_CONFIG.freeShippingThreshold;
      const fee = gov ? (isFree ? 0 : gov.fee) : 0;
      const grandTotal = subtotal + fee;

      if (card && priceEl) {
        if (!gov) {
          card.style.display = "none";
        } else {
          card.style.display = "flex";
          priceEl.textContent = isFree ? this.t("shippingFree") : this.formatCurrency(fee);
          if (daysEl) {
            daysEl.textContent = `${gov.deliveryDays} ${this.t("daysLabel")}`;
          }
        }
      }

      // Update inline summary numbers
      const subtotalEl = document.getElementById("checkout-inline-subtotal");
      const shippingEl = document.getElementById("checkout-inline-shipping");
      const grandtotalEl = document.getElementById("checkout-inline-grandtotal");

      if (subtotalEl) subtotalEl.textContent = this.formatCurrency(subtotal);
      if (shippingEl) {
        if (!gov) {
          shippingEl.textContent = isFree ? this.t("shippingFree") : (this.state.lang === "ar" ? "حسب المحافظة" : "Select gov");
        } else {
          shippingEl.textContent = isFree ? this.t("shippingFree") : this.formatCurrency(fee);
        }
      }
      if (grandtotalEl) {
        grandtotalEl.textContent = this.formatCurrency(gov ? grandTotal : subtotal);
      }
    },

    validateStep1() {
      let isValid = true;
      const c = this.state.checkout.customer;

      const nameInput = document.getElementById("checkout-fullname");
      const nameVal = nameInput ? nameInput.value.trim() : "";
      const nameFeedback = document.getElementById("val-name-feedback");
      const words = nameVal.split(/\s+/).filter(Boolean);
      if (words.length < 2) {
        isValid = false;
        nameInput?.classList.add("is-invalid");
        if (nameFeedback) nameFeedback.classList.add("visible");
      } else {
        nameInput?.classList.remove("is-invalid");
        if (nameFeedback) nameFeedback.classList.remove("visible");
        c.fullName = nameVal;
      }

      const mobileInput = document.getElementById("checkout-mobile");
      const mobileVal = mobileInput ? mobileInput.value.trim() : "";
      const mobileFeedback = document.getElementById("val-mobile-feedback");
      const egyptPhoneRegex = /^01[0125][0-9]{8}$/;
      if (!egyptPhoneRegex.test(mobileVal)) {
        isValid = false;
        mobileInput?.classList.add("is-invalid");
        if (mobileFeedback) mobileFeedback.classList.add("visible");
      } else {
        mobileInput?.classList.remove("is-invalid");
        if (mobileFeedback) mobileFeedback.classList.remove("visible");
        c.mobile = mobileVal;
      }

      const sameCheck = document.getElementById("checkout-same-as-mobile");
      const whatsappInput = document.getElementById("checkout-whatsapp");
      const whatsappFeedback = document.getElementById("val-whatsapp-feedback");
      if (sameCheck && sameCheck.checked) {
        c.sameAsMobile = true;
        c.whatsapp = c.mobile;
        whatsappInput?.classList.remove("is-invalid");
        if (whatsappFeedback) whatsappFeedback.classList.remove("visible");
      } else {
        c.sameAsMobile = false;
        const wVal = whatsappInput ? whatsappInput.value.trim() : "";
        if (wVal && !egyptPhoneRegex.test(wVal)) {
          isValid = false;
          whatsappInput?.classList.add("is-invalid");
          if (whatsappFeedback) whatsappFeedback.classList.add("visible");
        } else {
          whatsappInput?.classList.remove("is-invalid");
          if (whatsappFeedback) whatsappFeedback.classList.remove("visible");
          c.whatsapp = wVal;
        }
      }

      const govSelect = document.getElementById("checkout-gov-select");
      const govVal = govSelect ? govSelect.value : "";
      const govFeedback = document.getElementById("val-gov-feedback");
      if (!govVal) {
        isValid = false;
        govSelect?.classList.add("is-invalid");
        if (govFeedback) govFeedback.classList.add("visible");
      } else {
        govSelect?.classList.remove("is-invalid");
        if (govFeedback) govFeedback.classList.remove("visible");
        c.governorateId = govVal;
        this.state.checkout.governorate = GOVERNORATES.find(g => g.id === govVal);
      }

      const cityInput = document.getElementById("checkout-city");
      const cityVal = cityInput ? cityInput.value.trim() : "";
      const cityFeedback = document.getElementById("val-city-feedback");
      if (!cityVal) {
        isValid = false;
        cityInput?.classList.add("is-invalid");
        if (cityFeedback) cityFeedback.classList.add("visible");
      } else {
        cityInput?.classList.remove("is-invalid");
        if (cityFeedback) cityFeedback.classList.remove("visible");
        c.city = cityVal;
      }

      const addressInput = document.getElementById("checkout-address");
      const addressVal = addressInput ? addressInput.value.trim() : "";
      const addressFeedback = document.getElementById("val-address-feedback");
      if (!addressVal || addressVal.length < 5) {
        isValid = false;
        addressInput?.classList.add("is-invalid");
        if (addressFeedback) addressFeedback.classList.add("visible");
      } else {
        addressInput?.classList.remove("is-invalid");
        if (addressFeedback) addressFeedback.classList.remove("visible");
        c.address = addressVal;
      }

      const landmarkInput = document.getElementById("checkout-landmark");
      c.landmark = landmarkInput ? landmarkInput.value.trim() : "";
      const notesInput = document.getElementById("checkout-notes");
      c.notes = notesInput ? notesInput.value.trim() : "";

      return isValid;
    },

    renderCheckoutReview() {
      const isArabic = this.state.lang === "ar";
      const c = this.state.checkout.customer;
      const gov = this.state.checkout.governorate;
      const subtotal = this.getCartSubtotal();
      const isFree = subtotal >= STORE_CONFIG.freeShippingThreshold;
      const shippingFee = gov ? (isFree ? 0 : gov.fee) : STORE_CONFIG.defaultShippingFee;
      const grandTotal = subtotal + shippingFee;

      const nameEl = document.getElementById("review-name-val");
      const phoneEl = document.getElementById("review-phone-val");
      const govEl = document.getElementById("review-gov-val");
      const addressEl = document.getElementById("review-address-val");
      const deliveryEl = document.getElementById("review-delivery-val");

      if (nameEl) nameEl.textContent = c.fullName;
      if (phoneEl) phoneEl.textContent = c.mobile;
      if (govEl && gov) govEl.textContent = `${isArabic ? gov.name_ar : gov.name_en} - ${c.city}`;
      if (addressEl) addressEl.textContent = `${c.address}${c.landmark ? ` (${this.t("landmarkLabel")}: ${c.landmark})` : ""}`;
      if (deliveryEl && gov) deliveryEl.textContent = `${gov.deliveryDays} ${this.t("daysLabel")}`;

      const itemsContainer = document.getElementById("review-items-container");
      if (itemsContainer) {
        itemsContainer.innerHTML = this.state.cart.map(item => {
          const prod = PRODUCTS.find(p => p.id === item.productId);
          if (!prod) return "";
          const name = isArabic ? prod.name_ar : prod.name_en;
          const lineImg = resolveImage(prod.images[0], prod.id, 0);

          return `
            <div class="review-item-mini">
              <img src="${lineImg}" alt="${name}" onerror="handleImageError(this)" />
              <div style="flex: 1;">
                <div style="font-weight: 600; font-size: 0.88rem;">${name}</div>
                <div style="font-size: 0.78rem; color: var(--text-secondary);">
                  ${this.t("sizeLabel")} ${item.size} • ${item.color || ""} • ${this.t("quantity")}: ${item.qty}
                </div>
              </div>
              <div style="font-weight: 700; font-size: 0.92rem; color: var(--primary);">
                ${this.formatCurrency(prod.price * item.qty)}
              </div>
            </div>
          `;
        }).join("");
      }

      document.getElementById("review-subtotal-val").textContent = this.formatCurrency(subtotal);
      document.getElementById("review-shipping-val").textContent = isFree ? this.t("shippingFree") : this.formatCurrency(shippingFee);
      document.getElementById("review-grandtotal-val").textContent = this.formatCurrency(grandTotal);

      document.getElementById("review-edit-address")?.addEventListener("click", () => {
        this.state.checkout.step = 1;
        this.renderCheckoutStep();
      });
      document.getElementById("review-edit-payment")?.addEventListener("click", () => {
        this.state.checkout.step = 2;
        this.renderCheckoutStep();
      });
    },

    // 11. WhatsApp Order Delivery Generator
    finalizeOrderAndLaunchWhatsApp() {
      const isArabic = this.state.lang === "ar";
      const c = this.state.checkout.customer;
      const gov = this.state.checkout.governorate;
      const subtotal = this.getCartSubtotal();
      const isFree = subtotal >= STORE_CONFIG.freeShippingThreshold;
      const shippingFee = gov ? (isFree ? 0 : gov.fee) : STORE_CONFIG.defaultShippingFee;
      const grandTotal = subtotal + shippingFee;

      const now = new Date();
      const dateCode = `${now.getDate().toString().padStart(2, "0")}${(now.getMonth() + 1).toString().padStart(2, "0")}`;
      const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
      const orderRef = `LM-${dateCode}${randomPart}`;

      const day = now.getDate().toString().padStart(2, "0");
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const year = now.getFullYear();
      const hours = now.getHours().toString().padStart(2, "0");
      const mins = now.getMinutes().toString().padStart(2, "0");
      const formattedDate = `${day}/${month}/${year} – ${hours}:${mins}`;

      let message = "";

      if (isArabic) {
        message += `🛍️ *طلب جديد | New Order*\n`;
        message += `🔖 رقم الطلب: ${orderRef}\n`;
        message += `📅 التاريخ: ${formattedDate}\n`;
        message += `━━━━━━━━━━━━━━\n`;
        message += `👤 *بيانات العميل*\n`;
        message += `الاسم: ${c.fullName}\n`;
        message += `رقم الموبايل: ${c.mobile}\n`;
        if (c.whatsapp && c.whatsapp !== c.mobile) {
          message += `رقم الواتساب: ${c.whatsapp}\n`;
        }
        message += `━━━━━━━━━━━━━━\n`;
        message += `📍 *عنوان الشحن*\n`;
        message += `المحافظة: ${gov ? gov.name_ar : ""}\n`;
        message += `المدينة / المنطقة: ${c.city}\n`;
        message += `العنوان: ${c.address}\n`;
        if (c.landmark) {
          message += `علامة مميزة: ${c.landmark}\n`;
        }
        if (c.notes) {
          message += `ملاحظات: ${c.notes}\n`;
        }
        message += `━━━━━━━━━━━━━━\n`;
        message += `🧾 *تفاصيل الطلب*\n`;
        this.state.cart.forEach((item, idx) => {
          const prod = PRODUCTS.find(p => p.id === item.productId);
          if (!prod) return;
          const lineTotal = this.formatWesternNumber(prod.price * item.qty);
          message += `${idx + 1}) ${prod.name_ar} — المقاس: ${item.size} — اللون: ${item.color || "افتراضي"} — الكمية: ${item.qty} — السعر: ${lineTotal} ج.م\n`;
        });
        message += `━━━━━━━━━━━━━━\n`;
        message += `💰 *الحساب*\n`;
        message += `إجمالي المنتجات: ${this.formatWesternNumber(subtotal)} ج.م\n`;
        message += `الشحن: ${isFree ? "مجاني (عرض الشحن المجاني)" : `${this.formatWesternNumber(shippingFee)} ج.م`}\n`;
        message += `*الإجمالي النهائي: ${this.formatWesternNumber(grandTotal)} ج.م*\n`;
        message += `💳 طريقة الدفع: الدفع عند الاستلام (COD)\n`;
        message += `━━━━━━━━━━━━━━\n`;
        message += `شكراً لتسوقك مع لوميير 🌸`;
      } else {
        message += `🛍️ *New Order | طلب جديد*\n`;
        message += `🔖 Order Reference: ${orderRef}\n`;
        message += `📅 Date: ${formattedDate}\n`;
        message += `━━━━━━━━━━━━━━\n`;
        message += `👤 *Customer Details*\n`;
        message += `Name: ${c.fullName}\n`;
        message += `Mobile: ${c.mobile}\n`;
        if (c.whatsapp && c.whatsapp !== c.mobile) {
          message += `WhatsApp: ${c.whatsapp}\n`;
        }
        message += `━━━━━━━━━━━━━━\n`;
        message += `📍 *Delivery Address*\n`;
        message += `Governorate: ${gov ? gov.name_en : ""}\n`;
        message += `City / District: ${c.city}\n`;
        message += `Address: ${c.address}\n`;
        if (c.landmark) {
          message += `Landmark: ${c.landmark}\n`;
        }
        if (c.notes) {
          message += `Notes: ${c.notes}\n`;
        }
        message += `━━━━━━━━━━━━━━\n`;
        message += `🧾 *Order Items*\n`;
        this.state.cart.forEach((item, idx) => {
          const prod = PRODUCTS.find(p => p.id === item.productId);
          if (!prod) return;
          const lineTotal = this.formatWesternNumber(prod.price * item.qty);
          message += `${idx + 1}) ${prod.name_en} — Size: ${item.size} — Color: ${item.color || "Standard"} — Qty: ${item.qty} — Price: ${lineTotal} EGP\n`;
        });
        message += `━━━━━━━━━━━━━━\n`;
        message += `💰 *Billing Summary*\n`;
        message += `Items Subtotal: ${this.formatWesternNumber(subtotal)} EGP\n`;
        message += `Shipping: ${isFree ? "Free (Special Offer)" : `${this.formatWesternNumber(shippingFee)} EGP`}\n`;
        message += `*Grand Total: ${this.formatWesternNumber(grandTotal)} EGP*\n`;
        message += `💳 Payment Method: Cash on Delivery (COD)\n`;
        message += `━━━━━━━━━━━━━━\n`;
        message += `Thank you for choosing Lumière 🌸`;
      }

      const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

      this.state.lastCreatedOrder = {
        orderRef: orderRef,
        whatsappUrl: whatsappUrl
      };

      window.open(whatsappUrl, "_blank");

      const step1View = document.getElementById("checkout-step-1");
      const step1Footer = document.getElementById("checkout-step1-footer");
      const successView = document.getElementById("checkout-success-view");
      const refEl = document.getElementById("success-order-ref");
      const stepper = document.getElementById("checkout-stepper-bar");

      if (step1View) step1View.style.display = "none";
      if (step1Footer) step1Footer.style.display = "none";
      if (stepper) stepper.style.display = "none";
      if (successView) successView.style.display = "flex";
      if (refEl) refEl.textContent = orderRef;
    },

    openGeneralWhatsAppChat() {
      const isArabic = this.state.lang === "ar";
      const text = isArabic 
        ? "السلام عليكم لوميير، أود الاستفسار عن التشكيلة والمقاسات 🌸"
        : "Hello Lumière, I would love some assistance with your collection and sizing 🌸";
      const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank");
    },

    // Modal Helpers
    openModal(modalKey) {
      const modal = this.dom[modalKey];
      if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    },

    closeModal(modalKey) {
      const modal = this.dom[modalKey];
      if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      }
    },

    openSizeGuideModal() {
      this.openModal("sizeGuideModal");
    },

    closeAllOverlays() {
      this.closeDrawers();
      document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
      document.body.style.overflow = "";
    },

    // Toast Notifications
    showToast(message, type = "success") {
      if (!this.dom.toastContainer) return;
      const toast = document.createElement("div");
      toast.className = `toast-message ${type}`;
      toast.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${type === "warning" ? "#F59E0B" : "var(--gold)"}" stroke-width="2">
          ${type === "warning" ? '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>' : '<polyline points="20 6 9 17 4 12"/>'}
        </svg>
        <span>${message}</span>
      `;

      this.dom.toastContainer.appendChild(toast);

      setTimeout(() => {
        toast.classList.add("toast-out");
        setTimeout(() => toast.remove(), 320);
      }, 3000);
    },

    // IntersectionObserver Reveal Animation
    initScrollReveals() {
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });

        document.querySelectorAll(".fade-reveal:not(.revealed)").forEach(el => {
          observer.observe(el);
        });
      } else {
        document.querySelectorAll(".fade-reveal").forEach(el => el.classList.add("revealed"));
      }
    }
  };

  // Expose to window namespace
  window.LumiereApp = App;

  // Initialize on DOMContentLoaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => App.init());
  } else {
    App.init();
  }
})();
