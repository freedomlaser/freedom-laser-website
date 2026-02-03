/*
  Freedom Laser – EASY-TO-EDIT CONFIG
  -------------------------------------------------
  Edit business-specific values here (single source of truth).

  Notes:
  - phoneE164 should include country code and a leading +
    Example (Canada): +17054980894
  - prices are plain strings so you can include currency symbols
*/

window.SITE_CONFIG = {
  phoneDisplay: "(705) 498-0894",
  phoneE164: "+17054980894",

  // Domain email placeholder (update after you set your domain)
  email: "contact@YOURDOMAIN.ca",

  // Address placeholder
  address: "[ADDRESS HERE]",

  prices: {
    quitSmoking: "$[SESSION PRICE]",
    appetiteSuppression: "$[APPETITE PRICE]"
  }
};
