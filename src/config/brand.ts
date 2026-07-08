export const brand = {
  name: "Wealth Acumen",
  tagline: "Doing the right investment at the right time",
  description:
    "Choose Wealth Acumen for personalized strategies, trusted insights, ethical guidance, and steady, long-term wealth growth.",
  phone: "+91 93252 27357",
  whatsapp: "https://wa.me/9325227357",
  email: "info@wealthacumen.in",
  instagram:
    "https://www.instagram.com/wealthacumen31?igsh=MWIzcHpzbWt4ZDByMQ%3D%3D&utm_source=qr",
  whatsappChannel:
    "https://whatsapp.com/channel/0029VaaaGehLo4hjv6EYgm01",
  address:
    "4, Floor Ground, Plot-170, Empress Mahal, Dr. Babasaheb Ambedkar Road, Tilak Rd, Dadar East, Mumbai, Maharashtra 400014",
  city: "Mumbai",
  serviceArea: "All over India",

  // Angel One links
  angelOneAppLogin: "https://angel-one.onelink.me/Wjgr/h9fay40r",
  dematFreeMFLogin: "https://angel-one.onelink.me/Wjgr/wcqvcyi6",

  // AMFI links
  amfiFactsheet:
    "https://www.amfiindia.com/online-center/download-factsheets",
  amfiTaxation:
    "https://www.amfiindia.com/investor/knowledge-center-info?zoneName=TaxRegimeForMutualFunds",

  // Registration
  amfiRegNo: "247468",
  euinNo: "E459104",
  sebiPartnerReg: "INZ000161534",

  // Logo
  logo: "/assets/logo/logo.png",
} as const;

export const kycPortals = {
  statusCheck: [
    { name: "CVLKRA", url: "https://www.cvlkra.com/" },
    {
      name: "NSDL KRA",
      url: "https://kra.ndml.in/kra-web/jsps/pos/KYCClientInquiry_NEW.jsp",
    },
    { name: "CAMS KRA", url: "https://www.camskra.com/" },
    { name: "NSE KRA", url: "https://www.nsekra.com/" },
    {
      name: "KARVY KRA",
      url: "https://www.karvykra.com/index.aspx?ReturnUrl=%2f",
    },
  ],
  validation: [
    {
      name: "CVLKRA",
      url: "https://validate.cvlindia.com/CVLKRAVerification_V1/",
    },
    {
      name: "NSDL KRA",
      url: "https://kra.ndml.in/kra/ckyc/#/initiate",
    },
    {
      name: "CAMS KRA",
      url: "https://www.camskra.com/PanDetailsUpdate.aspx",
    },
    {
      name: "KARVY KRA",
      url: "https://www.karvykra.com/KYC_Validation/Default.aspx",
    },
  ],
  downloads: [
    { name: "KYC Non-Individual", file: "/forms/CAMSKRA_Non_Individual.pdf" },
    { name: "KYC Individual", file: "/forms/Individual_KYC.pdf" },
    {
      name: "FATCA Non-Individual",
      file: "/forms/CAMS_FATCA_Non_Individual.pdf",
    },
    { name: "FATCA Individual", file: "/forms/CAMS_FATCA-Individuals.pdf" },
  ],
} as const;
