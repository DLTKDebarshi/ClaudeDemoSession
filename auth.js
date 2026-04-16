(function () {
  var _u = 'admin';
  var _p = 'dltkdebarshi';

  function basePath() {
    return window.location.pathname.indexOf('/handsonlabs/') !== -1 ? '../' : '';
  }

  window.Auth = {
    isAdmin: function () {
      return sessionStorage.getItem('isAdmin') === 'true';
    },

    login: function (username, password) {
      if (username === _u && password === _p) {
        sessionStorage.setItem('isAdmin', 'true');
        return true;
      }
      return false;
    },

    logout: function () {
      sessionStorage.removeItem('isAdmin');
      window.location.href = basePath() + 'index.html';
    },

    /* Redirect non-admins to login page (for fully gated pages) */
    requireAdmin: function () {
      if (!this.isAdmin()) {
        var returnUrl = window.location.pathname.split('/').pop();
        window.location.href = basePath() + 'login.html?returnUrl=' + encodeURIComponent(returnUrl);
        return false;
      }
      document.body.style.visibility = 'visible';
      return true;
    },

    /* Standard page init: hide solutions for participants, inject nav UI */
    initPage: function () {
      if (this.isAdmin()) {
        document.body.classList.add('is-admin');
      } else {
        document.body.classList.add('is-participant');
      }
      this._injectNavButton();
    },

    _injectNavButton: function () {
      /* Try topnav first (lab pages), then create a floating button */
      var target = document.querySelector('.topnav');
      var btn = document.createElement('a');
      btn.style.cssText =
        'font-size:13px;padding:6px 16px;border-radius:20px;text-decoration:none;font-weight:600;white-space:nowrap;cursor:pointer;';

      if (this.isAdmin()) {
        btn.textContent = 'Admin \u2713  Logout';
        btn.style.background = 'rgba(234,67,53,0.12)';
        btn.style.color = '#EA4335';
        btn.href = '#';
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          Auth.logout();
        });
      } else {
        btn.textContent = 'Admin Login';
        btn.style.background = 'rgba(66,133,244,0.12)';
        btn.style.color = '#4285F4';
        btn.href = basePath() + 'login.html';
      }

      if (target) {
        target.appendChild(btn);
      } else {
        /* Floating button for pages without topnav */
        btn.style.cssText +=
          'position:fixed;top:16px;right:24px;z-index:9999;box-shadow:0 2px 8px rgba(0,0,0,0.15);background:white;border:1px solid #E2E8F0;';
        if (this.isAdmin()) {
          btn.style.background = '#FEF2F2';
        }
        document.body.appendChild(btn);
      }
    }
  };
})();
