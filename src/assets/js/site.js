/* Shinfield Parish First: menu button and sign-up form checks. The site works fully without this file. */
(function () {
  "use strict";

  // Menu: on narrow screens the button shows and hides the main navigation.
  var button = document.querySelector(".menu-button");
  var nav = document.getElementById("main-nav");
  if (button && nav) {
    var wide = window.matchMedia("(min-width: 60em)");
    var setOpen = function (open) {
      button.setAttribute("aria-expanded", open ? "true" : "false");
      nav.setAttribute("data-collapsed", open ? "false" : "true");
    };
    button.hidden = false;
    setOpen(false);
    button.addEventListener("click", function () {
      setOpen(button.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && button.getAttribute("aria-expanded") === "true" && !wide.matches) {
        setOpen(false);
        button.focus();
      }
    });
  }

  var form = document.querySelector("form[data-validate]");
  if (!form) return;

  // ?role=advocate or ?role=candidate pre-ticks the matching box.
  var role = new URLSearchParams(window.location.search).get("role");
  if (role) {
    var box = form.querySelector('input[data-role="' + role.replace(/[^a-z]/g, "") + '"]');
    if (box) box.checked = true;
  }

  var summary = document.getElementById("error-summary");
  var list = summary.querySelector("ul");
  var emailOk = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); };

  var checks = [
    { id: "name", field: "field-name", target: "name", test: function () { return form.name.value.trim() !== ""; }, msg: "Enter your name" },
    { id: "email", field: "field-email", target: "email", test: function () { return emailOk(form.email.value.trim()); }, msg: "Enter an email address like name@example.com" },
    { id: "help", field: "field-help", target: "help-candidate", test: function () { return form.querySelectorAll('input[name="help"]:checked').length > 0; }, msg: "Choose at least one way you'd like to help" },
    { id: "consent", field: "field-consent", target: "consent", test: function () { return form.consent.checked; }, msg: "Tick the box to agree to us keeping your details" }
  ];

  var describe = function (el, errorId, on) {
    var ids = (el.getAttribute("aria-describedby") || "").split(" ").filter(function (x) { return x && x !== errorId; });
    if (on) ids.unshift(errorId);
    if (ids.length) el.setAttribute("aria-describedby", ids.join(" "));
    else el.removeAttribute("aria-describedby");
  };

  form.addEventListener("submit", function (e) {
    var errors = [];
    checks.forEach(function (c) {
      var ok = c.test();
      var error = document.getElementById(c.id + "-error");
      var wrap = document.getElementById(c.field);
      var describedEl = document.getElementById(c.id === "help" ? "help" : c.target);
      error.hidden = ok;
      error.textContent = ok ? "" : "Error: " + c.msg;
      wrap.classList.toggle("field-has-error", !ok);
      describe(describedEl, c.id + "-error", !ok);
      if (c.id !== "help") {
        if (ok) describedEl.removeAttribute("aria-invalid");
        else describedEl.setAttribute("aria-invalid", "true");
      }
      if (!ok) errors.push(c);
    });
    if (errors.length) {
      e.preventDefault();
      list.innerHTML = "";
      errors.forEach(function (c) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "#" + c.target;
        a.textContent = c.msg;
        a.addEventListener("click", function (ev) {
          ev.preventDefault();
          document.getElementById(c.target).focus();
        });
        li.appendChild(a);
        list.appendChild(li);
      });
      summary.hidden = false;
      summary.setAttribute("aria-labelledby", "error-summary-title");
      summary.focus();
    } else {
      summary.hidden = true;
    }
  });
})();
