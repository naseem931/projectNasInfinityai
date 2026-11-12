// =========================================================================
// NasInfinity AI - Interactive Periodic Table of Elements Studio Engine
// =========================================================================

    // =========================================================================
    // 🧪 Interactive Periodic Table of Elements Studio Controller & Engine
    // =========================================================================
    const periodicModal = document.getElementById('periodicModal');
    const ptGridContainer = document.getElementById('ptGridContainer');
    const ptInspector = document.getElementById('ptInspector');
    const ptSearchInput = document.getElementById('ptSearchInput');
    const ptCategoryFilter = document.getElementById('ptCategoryFilter');
    const ptPhaseFilter = document.getElementById('ptPhaseFilter');
    const ptGridView = document.getElementById('ptGridView');
    const ptListView = document.getElementById('ptListView');
    const ptListContainer = document.getElementById('ptListContainer');
    const ptCountDisplay = document.getElementById('ptCountDisplay');
    const ptListCountDisplay = document.getElementById('ptListCountDisplay');

    let currentSelectedElement = 1; // Default to Hydrogen (1)
    let currentPtCategory = 'all';
    let currentPtPhase = 'all';
    let currentPtSearch = '';
    let currentPtSort = 'num-asc';
    let currentPtView = 'grid';

    const ELEMENTS_DATA = [
  {
    "num": 1,
    "sym": "H",
    "name": "Hydrogen",
    "mass": 1.008,
    "cat": "nonmetal",
    "col": 1,
    "row": 1,
    "per": 1,
    "grp": 1,
    "phase": "Gas",
    "block": "s",
    "config": "1s¹",
    "shells": [
      1
    ],
    "en": 2.2,
    "mp": -259.16,
    "bp": -252.87,
    "density": 0.00008988,
    "ox": "+1, -1",
    "discovered": "1766",
    "by": "Henry Cavendish",
    "summary": "Most abundant chemical substance in the universe. Powers stellar fusion and combines with oxygen to form water.",
    "uses": [
      "Clean Energy & Fuel Cells",
      "Ammonia (Haber Process)",
      "Rocket Fuel",
      "Petroleum Refining"
    ]
  },
  {
    "num": 2,
    "sym": "He",
    "name": "Helium",
    "mass": 4.0026,
    "cat": "noble",
    "col": 18,
    "row": 1,
    "per": 1,
    "grp": 18,
    "phase": "Gas",
    "block": "s",
    "config": "1s²",
    "shells": [
      2
    ],
    "en": null,
    "mp": -272.2,
    "bp": -268.93,
    "density": 0.0001785,
    "ox": "0",
    "discovered": "1868",
    "by": "Pierre Janssen & Norman Lockyer",
    "summary": "Colorless, odorless noble gas. Second most abundant element in cosmos; essential cryogenic coolant.",
    "uses": [
      "MRI Scanner Cryogenics",
      "Scientific Balloons",
      "Deep Sea Breathing Gas",
      "Semiconductor Manufacturing"
    ]
  },
  {
    "num": 3,
    "sym": "Li",
    "name": "Lithium",
    "mass": 6.94,
    "cat": "alkali",
    "col": 1,
    "row": 2,
    "per": 2,
    "grp": 1,
    "phase": "Solid",
    "block": "s",
    "config": "[He] 2s¹",
    "shells": [
      2,
      1
    ],
    "en": 0.98,
    "mp": 180.54,
    "bp": 1342,
    "density": 0.534,
    "ox": "+1",
    "discovered": "1817",
    "by": "Johan August Arfwedson",
    "summary": "Lightest metallic element. Cornerstone of global clean transport via lithium-ion batteries.",
    "uses": [
      "EV & Phone Batteries",
      "Psychiatric Medicine",
      "Aerospace Alloys",
      "High-Temp Greases"
    ]
  },
  {
    "num": 4,
    "sym": "Be",
    "name": "Beryllium",
    "mass": 9.0122,
    "cat": "alkaline",
    "col": 2,
    "row": 2,
    "per": 2,
    "grp": 2,
    "phase": "Solid",
    "block": "s",
    "config": "[He] 2s²",
    "shells": [
      2,
      2
    ],
    "en": 1.57,
    "mp": 1287,
    "bp": 2469,
    "density": 1.85,
    "ox": "+2",
    "discovered": "1798",
    "by": "Louis-Nicolas Vauquelin",
    "summary": "Lightweight, non-magnetic alkaline earth metal with exceptional stiffness and thermal stability.",
    "uses": [
      "Space Telescope Mirrors",
      "Aerospace Gyroscopes",
      "X-ray Tube Windows",
      "Nuclear Moderators"
    ]
  },
  {
    "num": 5,
    "sym": "B",
    "name": "Boron",
    "mass": 10.81,
    "cat": "metalloid",
    "col": 13,
    "row": 2,
    "per": 2,
    "grp": 13,
    "phase": "Solid",
    "block": "p",
    "config": "[He] 2s² 2p¹",
    "shells": [
      2,
      3
    ],
    "en": 2.04,
    "mp": 2076,
    "bp": 3927,
    "density": 2.34,
    "ox": "+3",
    "discovered": "1808",
    "by": "Joseph Louis Gay-Lussac & Louis Jacques Thénard",
    "summary": "Hard, dark metalloid. Vital component of thermal-shock-resistant borosilicate glass and semiconductors.",
    "uses": [
      "Pyrex Heat-Resistant Glass",
      "Fiberglass",
      "Semiconductor P-dopant",
      "Neodymium Magnets"
    ]
  },
  {
    "num": 6,
    "sym": "C",
    "name": "Carbon",
    "mass": 12.011,
    "cat": "nonmetal",
    "col": 14,
    "row": 2,
    "per": 2,
    "grp": 14,
    "phase": "Solid",
    "block": "p",
    "config": "[He] 2s² 2p²",
    "shells": [
      2,
      4
    ],
    "en": 2.55,
    "mp": 3550,
    "bp": 4027,
    "density": 2.267,
    "ox": "+4, +2, -4",
    "discovered": "Ancient",
    "by": "Early Civilizations",
    "summary": "Chemical backbone of all known organic life. Forms diamond, graphite, carbon fibers, and graphene.",
    "uses": [
      "Structural Biology & Life",
      "Steel Production",
      "Carbon Fiber Composites",
      "Active Water Filtration"
    ]
  },
  {
    "num": 7,
    "sym": "N",
    "name": "Nitrogen",
    "mass": 14.007,
    "cat": "nonmetal",
    "col": 15,
    "row": 2,
    "per": 2,
    "grp": 15,
    "phase": "Gas",
    "block": "p",
    "config": "[He] 2s² 2p³",
    "shells": [
      2,
      5
    ],
    "en": 3.04,
    "mp": -210,
    "bp": -195.79,
    "density": 0.0012506,
    "ox": "±3, +5, +4, +2",
    "discovered": "1772",
    "by": "Daniel Rutherford",
    "summary": "Constitutes 78% of Earth's atmosphere. Crucial component of DNA, RNA, and protein amino acids.",
    "uses": [
      "Crop Fertilizers (Ammonia)",
      "Liquid Nitrogen Cryogenics",
      "Inert Food Packaging",
      "Airbags & Explosives"
    ]
  },
  {
    "num": 8,
    "sym": "O",
    "name": "Oxygen",
    "mass": 15.999,
    "cat": "nonmetal",
    "col": 16,
    "row": 2,
    "per": 2,
    "grp": 16,
    "phase": "Gas",
    "block": "p",
    "config": "[He] 2s² 2p⁴",
    "shells": [
      2,
      6
    ],
    "en": 3.44,
    "mp": -218.79,
    "bp": -182.96,
    "density": 0.001429,
    "ox": "-2",
    "discovered": "1774",
    "by": "Joseph Priestley & Carl Wilhelm Scheele",
    "summary": "Highly reactive nonmetal supporting cellular respiration and fueling global planetary metabolism.",
    "uses": [
      "Medical Life Support",
      "Steelmaking & Metallurgy",
      "Rocket Propellant Oxidizer",
      "Ozone Water Treatment"
    ]
  },
  {
    "num": 9,
    "sym": "F",
    "name": "Fluorine",
    "mass": 18.998,
    "cat": "halogen",
    "col": 17,
    "row": 2,
    "per": 2,
    "grp": 17,
    "phase": "Gas",
    "block": "p",
    "config": "[He] 2s² 2p⁵",
    "shells": [
      2,
      7
    ],
    "en": 3.98,
    "mp": -219.67,
    "bp": -188.11,
    "density": 0.001696,
    "ox": "-1",
    "discovered": "1886",
    "by": "Henri Moissan",
    "summary": "Most electronegative and reactive element in the periodic table. Reacts vigorously with almost all materials.",
    "uses": [
      "PTFE / Teflon Coatings",
      "Toothpaste Cavity Defense",
      "HVAC Refrigerants",
      "Pharmaceutical Fluorination"
    ]
  },
  {
    "num": 10,
    "sym": "Ne",
    "name": "Neon",
    "mass": 20.18,
    "cat": "noble",
    "col": 18,
    "row": 2,
    "per": 2,
    "grp": 18,
    "phase": "Gas",
    "block": "p",
    "config": "[He] 2s² 2p⁶",
    "shells": [
      2,
      8
    ],
    "en": null,
    "mp": -248.59,
    "bp": -246.08,
    "density": 0.0008999,
    "ox": "0",
    "discovered": "1898",
    "by": "William Ramsay & Morris Travers",
    "summary": "Inert noble gas renowned for its reddish-orange glow in high-voltage electrical discharge tubes.",
    "uses": [
      "Glow Indicators & Signage",
      "Gas Lasers (He-Ne)",
      "Cryogenic Refrigerants",
      "Surge Protectors"
    ]
  },
  {
    "num": 11,
    "sym": "Na",
    "name": "Sodium",
    "mass": 22.99,
    "cat": "alkali",
    "col": 1,
    "row": 3,
    "per": 3,
    "grp": 1,
    "phase": "Solid",
    "block": "s",
    "config": "[Ne] 3s¹",
    "shells": [
      2,
      8,
      1
    ],
    "en": 0.93,
    "mp": 97.79,
    "bp": 883,
    "density": 0.971,
    "ox": "+1",
    "discovered": "1807",
    "by": "Humphry Davy",
    "summary": "Soft, silvery alkali metal reacting vigorously with water. Key electrolyte in nervous systems.",
    "uses": [
      "Table Salt (NaCl)",
      "Sodium-Ion Batteries",
      "Street Lighting (Sodium Vapor)",
      "Nuclear Reactor Coolant"
    ]
  },
  {
    "num": 12,
    "sym": "Mg",
    "name": "Magnesium",
    "mass": 24.305,
    "cat": "alkaline",
    "col": 2,
    "row": 3,
    "per": 3,
    "grp": 2,
    "phase": "Solid",
    "block": "s",
    "config": "[Ne] 3s²",
    "shells": [
      2,
      8,
      2
    ],
    "en": 1.31,
    "mp": 650,
    "bp": 1090,
    "density": 1.738,
    "ox": "+2",
    "discovered": "1755",
    "by": "Joseph Black",
    "summary": "Lightweight structural metal. Forms catalytic center of chlorophyll in plant photosynthesis.",
    "uses": [
      "Automotive Lightweight Alloys",
      "Electronics Chassis",
      "Signal Flares & Fireworks",
      "Cellular Enzymatic Biology"
    ]
  },
  {
    "num": 13,
    "sym": "Al",
    "name": "Aluminium",
    "mass": 26.982,
    "cat": "post-transition",
    "col": 13,
    "row": 3,
    "per": 3,
    "grp": 13,
    "phase": "Solid",
    "block": "p",
    "config": "[Ne] 3s² 3p¹",
    "shells": [
      2,
      8,
      3
    ],
    "en": 1.61,
    "mp": 660.32,
    "bp": 2470,
    "density": 2.7,
    "ox": "+3",
    "discovered": "1825",
    "by": "Hans Christian Ørsted",
    "summary": "Most abundant metal in Earth's crust. Lightweight, high corrosion resistance, and infinitely recyclable.",
    "uses": [
      "Aviation & Car Bodies",
      "Beverage Cans & Packaging",
      "Power Transmission Lines",
      "Construction Window Frames"
    ]
  },
  {
    "num": 14,
    "sym": "Si",
    "name": "Silicon",
    "mass": 28.085,
    "cat": "metalloid",
    "col": 14,
    "row": 3,
    "per": 3,
    "grp": 14,
    "phase": "Solid",
    "block": "p",
    "config": "[Ne] 3s² 3p²",
    "shells": [
      2,
      8,
      4
    ],
    "en": 1.9,
    "mp": 1414,
    "bp": 3265,
    "density": 2.329,
    "ox": "+4, -4",
    "discovered": "1824",
    "by": "Jöns Jacob Berzelius",
    "summary": "Foundation of information technology and digital civilization. Primary semiconductor for microprocessors.",
    "uses": [
      "Microprocessors & Memory Chips",
      "Photovoltaic Solar Cells",
      "Silicone Sealants & Rubbers",
      "Architectural Glass & Concrete"
    ]
  },
  {
    "num": 15,
    "sym": "P",
    "name": "Phosphorus",
    "mass": 30.974,
    "cat": "nonmetal",
    "col": 15,
    "row": 3,
    "per": 3,
    "grp": 15,
    "phase": "Solid",
    "block": "p",
    "config": "[Ne] 3s² 3p³",
    "shells": [
      2,
      8,
      5
    ],
    "en": 2.19,
    "mp": 44.15,
    "bp": 280.5,
    "density": 1.823,
    "ox": "+5, +3, -3",
    "discovered": "1669",
    "by": "Hennig Brand",
    "summary": "Nonmetal essential for biological energy storage (ATP) and genetic structures (DNA/RNA backbone).",
    "uses": [
      "Agricultural Fertilizers",
      "LFP EV Batteries",
      "Safety Matches",
      "Steel Passivation"
    ]
  },
  {
    "num": 16,
    "sym": "S",
    "name": "Sulfur",
    "mass": 32.06,
    "cat": "nonmetal",
    "col": 16,
    "row": 3,
    "per": 3,
    "grp": 16,
    "phase": "Solid",
    "block": "p",
    "config": "[Ne] 3s² 3p⁴",
    "shells": [
      2,
      8,
      6
    ],
    "en": 2.58,
    "mp": 115.21,
    "bp": 444.6,
    "density": 2.07,
    "ox": "+6, +4, -2",
    "discovered": "Ancient",
    "by": "Early Civilizations",
    "summary": "Bright yellow crystalline nonmetal. Precursor to sulfuric acid, the world's most manufactured chemical.",
    "uses": [
      "Sulfuric Acid Production",
      "Vulcanized Rubber Tires",
      "Gunpowder & Pyrotechnics",
      "Fungicides & Antibiotics"
    ]
  },
  {
    "num": 17,
    "sym": "Cl",
    "name": "Chlorine",
    "mass": 35.45,
    "cat": "halogen",
    "col": 17,
    "row": 3,
    "per": 3,
    "grp": 17,
    "phase": "Gas",
    "block": "p",
    "config": "[Ne] 3s² 3p⁵",
    "shells": [
      2,
      8,
      7
    ],
    "en": 3.16,
    "mp": -101.5,
    "bp": -34.04,
    "density": 0.003214,
    "ox": "±1, +3, +5, +7",
    "discovered": "1774",
    "by": "Carl Wilhelm Scheele",
    "summary": "Greenish-yellow halogen gas with strong oxidizing power. Cornerstone of water hygiene and plastics.",
    "uses": [
      "Drinking Water Sanitation",
      "PVC Polymers & Pipes",
      "Disinfectants & Bleach",
      "Pharmaceutical Synthesis"
    ]
  },
  {
    "num": 18,
    "sym": "Ar",
    "name": "Argon",
    "mass": 39.95,
    "cat": "noble",
    "col": 18,
    "row": 3,
    "per": 3,
    "grp": 18,
    "phase": "Gas",
    "block": "p",
    "config": "[Ne] 3s² 3p⁶",
    "shells": [
      2,
      8,
      8
    ],
    "en": null,
    "mp": -189.35,
    "bp": -185.85,
    "density": 0.0017837,
    "ox": "0",
    "discovered": "1894",
    "by": "Lord Rayleigh & William Ramsay",
    "summary": "Inert atmospheric noble gas (~0.93% of air). Provides unreactive atmosphere for industrial welding.",
    "uses": [
      "TIG & MIG Shielding Gas",
      "Double-Pane Window Insulation",
      "Silicon Ingot Crystal Growth",
      "Incandescent Bulbs"
    ]
  },
  {
    "num": 19,
    "sym": "K",
    "name": "Potassium",
    "mass": 39.098,
    "cat": "alkali",
    "col": 1,
    "row": 4,
    "per": 4,
    "grp": 1,
    "phase": "Solid",
    "block": "s",
    "config": "[Ar] 4s¹",
    "shells": [
      2,
      8,
      8,
      1
    ],
    "en": 0.82,
    "mp": 63.5,
    "bp": 759,
    "density": 0.862,
    "ox": "+1",
    "discovered": "1807",
    "by": "Humphry Davy",
    "summary": "Silvery alkali metal reacting vigorously with water. Governs cellular osmotic pressure and nerve signaling.",
    "uses": [
      "Potash Agricultural Fertilizers",
      "Industrial Soaps",
      "Electrolyte Balancing",
      "Oxidizer Compounds"
    ]
  },
  {
    "num": 20,
    "sym": "Ca",
    "name": "Calcium",
    "mass": 40.078,
    "cat": "alkaline",
    "col": 2,
    "row": 4,
    "per": 4,
    "grp": 2,
    "phase": "Solid",
    "block": "s",
    "config": "[Ar] 4s²",
    "shells": [
      2,
      8,
      8,
      2
    ],
    "en": 1,
    "mp": 842,
    "bp": 1484,
    "density": 1.54,
    "ox": "+2",
    "discovered": "1808",
    "by": "Humphry Davy",
    "summary": "Fifth most abundant element in Earth's crust. Primary mineral in vertebrate bones, shells, and cement.",
    "uses": [
      "Cement & Concrete Construction",
      "Bone & Dental Structures",
      "Steel Deoxidation",
      "Limestone Neutralization"
    ]
  },
  {
    "num": 21,
    "sym": "Sc",
    "name": "Scandium",
    "mass": 44.956,
    "cat": "transition",
    "col": 3,
    "row": 4,
    "per": 4,
    "grp": 3,
    "phase": "Solid",
    "block": "d",
    "config": "[Ar] 3d¹ 4s²",
    "shells": [
      2,
      8,
      9,
      2
    ],
    "en": 1.36,
    "mp": 1541,
    "bp": 2836,
    "density": 2.985,
    "ox": "+3",
    "discovered": "1879",
    "by": "Lars Fredrik Nilson",
    "summary": "Silvery transition metal used to produce ultra-high-strength, weldable aerospace aluminum alloys.",
    "uses": [
      "Aerospace Scandium-Al Alloys",
      "High-Intensity Halide Stadium Lights",
      "Solid Oxide Fuel Cells",
      "Sporting Equipment"
    ]
  },
  {
    "num": 22,
    "sym": "Ti",
    "name": "Titanium",
    "mass": 47.867,
    "cat": "transition",
    "col": 4,
    "row": 4,
    "per": 4,
    "grp": 4,
    "phase": "Solid",
    "block": "d",
    "config": "[Ar] 3d² 4s²",
    "shells": [
      2,
      8,
      10,
      2
    ],
    "en": 1.54,
    "mp": 1668,
    "bp": 3287,
    "density": 4.506,
    "ox": "+4, +3",
    "discovered": "1791",
    "by": "William Gregor",
    "summary": "Strong, lightweight transition metal with highest strength-to-density ratio and immune biocompatibility.",
    "uses": [
      "Jet Engines & Spacecraft Airframes",
      "Medical Orthopedic Implants",
      "TiO2 Bright White Pigment",
      "Chemical Reactor Vessels"
    ]
  },
  {
    "num": 23,
    "sym": "V",
    "name": "Vanadium",
    "mass": 50.942,
    "cat": "transition",
    "col": 5,
    "row": 4,
    "per": 4,
    "grp": 5,
    "phase": "Solid",
    "block": "d",
    "config": "[Ar] 3d³ 4s²",
    "shells": [
      2,
      8,
      11,
      2
    ],
    "en": 1.63,
    "mp": 1910,
    "bp": 3407,
    "density": 6.11,
    "ox": "+5, +4, +3, +2",
    "discovered": "1801",
    "by": "Andrés Manuel del Río",
    "summary": "Ductile transition metal. Fortifies steel against fatigue, shock, and corrosion.",
    "uses": [
      "High-Strength Alloy Steels",
      "Vanadium Redox Flow Batteries",
      "Chemical Oxidation Catalysts",
      "Superconducting Magnets"
    ]
  },
  {
    "num": 24,
    "sym": "Cr",
    "name": "Chromium",
    "mass": 51.996,
    "cat": "transition",
    "col": 6,
    "row": 4,
    "per": 4,
    "grp": 6,
    "phase": "Solid",
    "block": "d",
    "config": "[Ar] 3d⁵ 4s¹",
    "shells": [
      2,
      8,
      13,
      1
    ],
    "en": 1.66,
    "mp": 1907,
    "bp": 2671,
    "density": 7.15,
    "ox": "+6, +3, +2",
    "discovered": "1797",
    "by": "Louis-Nicolas Vauquelin",
    "summary": "Hard, lustrous steel-gray metal. Gives stainless steel its non-corrosive passivation layer.",
    "uses": [
      "Stainless Steel Alloys",
      "Chrome Protective Plating",
      "Refractory Furnace Linings",
      "Pigments & Dyes"
    ]
  },
  {
    "num": 25,
    "sym": "Mn",
    "name": "Manganese",
    "mass": 54.938,
    "cat": "transition",
    "col": 7,
    "row": 4,
    "per": 4,
    "grp": 7,
    "phase": "Solid",
    "block": "d",
    "config": "[Ar] 3d⁵ 4s²",
    "shells": [
      2,
      8,
      13,
      2
    ],
    "en": 1.55,
    "mp": 1246,
    "bp": 2061,
    "density": 7.44,
    "ox": "+7, +4, +2",
    "discovered": "1774",
    "by": "Johan Gottlieb Gahn",
    "summary": "Essential element in metallurgy for sulfur removal and increasing steel hardness. Crucial in EV batteries.",
    "uses": [
      "Steelmaking Desulfurization",
      "Lithium-Ion Battery Cathodes",
      "Alkaline Dry Cell Batteries",
      "Aluminum Can Strength"
    ]
  },
  {
    "num": 26,
    "sym": "Fe",
    "name": "Iron",
    "mass": 55.845,
    "cat": "transition",
    "col": 8,
    "row": 4,
    "per": 4,
    "grp": 8,
    "phase": "Solid",
    "block": "d",
    "config": "[Ar] 3d⁶ 4s²",
    "shells": [
      2,
      8,
      14,
      2
    ],
    "en": 1.83,
    "mp": 1538,
    "bp": 2862,
    "density": 7.874,
    "ox": "+2, +3",
    "discovered": "Ancient",
    "by": "Early Civilizations",
    "summary": "Most abundant metal by mass on Earth. Backbone of human civilization through steel and hemoglobin.",
    "uses": [
      "Steel Infrastructure & Buildings",
      "Blood Hemoglobin Oxygen Carrier",
      "Electric Motors & Transformers",
      "Chemical Synthesis Catalysts"
    ]
  },
  {
    "num": 27,
    "sym": "Co",
    "name": "Cobalt",
    "mass": 58.933,
    "cat": "transition",
    "col": 9,
    "row": 4,
    "per": 4,
    "grp": 9,
    "phase": "Solid",
    "block": "d",
    "config": "[Ar] 3d⁷ 4s²",
    "shells": [
      2,
      8,
      15,
      2
    ],
    "en": 1.88,
    "mp": 1495,
    "bp": 2927,
    "density": 8.86,
    "ox": "+2, +3",
    "discovered": "1735",
    "by": "George Brandt",
    "summary": "Ferromagnetic metal critical for high-energy EV batteries and jet engine superalloys.",
    "uses": [
      "EV NMC Battery Cathodes",
      "Jet Engine High-Temp Turbines",
      "Permanent Alnico Magnets",
      "Deep Blue Glass Pigments"
    ]
  },
  {
    "num": 28,
    "sym": "Ni",
    "name": "Nickel",
    "mass": 58.693,
    "cat": "transition",
    "col": 10,
    "row": 4,
    "per": 4,
    "grp": 10,
    "phase": "Solid",
    "block": "d",
    "config": "[Ar] 3d⁸ 4s²",
    "shells": [
      2,
      8,
      16,
      2
    ],
    "en": 1.91,
    "mp": 1455,
    "bp": 2913,
    "density": 8.912,
    "ox": "+2",
    "discovered": "1751",
    "by": "Axel Fredrik Cronstedt",
    "summary": "Silvery-white lustrous metal with excellent corrosion resistance at high temperatures.",
    "uses": [
      "Austenitic Stainless Steels",
      "High-Energy Battery Cells",
      "Coinage Alloys",
      "Electroplating Protection"
    ]
  },
  {
    "num": 29,
    "sym": "Cu",
    "name": "Copper",
    "mass": 63.546,
    "cat": "transition",
    "col": 11,
    "row": 4,
    "per": 4,
    "grp": 11,
    "phase": "Solid",
    "block": "d",
    "config": "[Ar] 3d¹⁰ 4s¹",
    "shells": [
      2,
      8,
      18,
      1
    ],
    "en": 1.9,
    "mp": 1084.62,
    "bp": 2562,
    "density": 8.96,
    "ox": "+2, +1",
    "discovered": "Ancient",
    "by": "Early Civilizations",
    "summary": "Red-orange metal with supreme electrical and thermal conductivity. Foundation of electrification.",
    "uses": [
      "Electrical Grids & Wiring",
      "Electronics PCB Circuits",
      "Plumbing & Antimicrobial Fixtures",
      "Bronze & Brass Alloys"
    ]
  },
  {
    "num": 30,
    "sym": "Zn",
    "name": "Zinc",
    "mass": 65.38,
    "cat": "transition",
    "col": 12,
    "row": 4,
    "per": 4,
    "grp": 12,
    "phase": "Solid",
    "block": "d",
    "config": "[Ar] 3d¹⁰ 4s²",
    "shells": [
      2,
      8,
      18,
      2
    ],
    "en": 1.65,
    "mp": 419.53,
    "bp": 907,
    "density": 7.134,
    "ox": "+2",
    "discovered": "Ancient",
    "by": "Indian Metallurgists",
    "summary": "Bluish-white metal primarily deployed to protect iron and steel from rusting via galvanization.",
    "uses": [
      "Galvanized Steel Rust Defense",
      "Die-Cast Components",
      "Alkaline Battery Anodes",
      "Zinc Oxide Sunscreens"
    ]
  },
  {
    "num": 31,
    "sym": "Ga",
    "name": "Gallium",
    "mass": 69.723,
    "cat": "post-transition",
    "col": 13,
    "row": 4,
    "per": 4,
    "grp": 13,
    "phase": "Solid",
    "block": "p",
    "config": "[Ar] 3d¹⁰ 4s² 4p¹",
    "shells": [
      2,
      8,
      18,
      3
    ],
    "en": 1.81,
    "mp": 29.76,
    "bp": 2204,
    "density": 5.91,
    "ox": "+3",
    "discovered": "1875",
    "by": "Paul-Émile Lecoq de Boisbaudran",
    "summary": "Unique metal that melts in human hands (29.8°C). Critical compound semiconductor for 5G and blue LEDs.",
    "uses": [
      "Gallium Nitride (GaN) Fast Chargers",
      "GaAs High-Frequency RF Chips",
      "Blue & Violet Laser Diodes",
      "High-Temp Thermometers"
    ]
  },
  {
    "num": 32,
    "sym": "Ge",
    "name": "Germanium",
    "mass": 72.63,
    "cat": "metalloid",
    "col": 14,
    "row": 4,
    "per": 4,
    "grp": 14,
    "phase": "Solid",
    "block": "p",
    "config": "[Ar] 3d¹⁰ 4s² 4p²",
    "shells": [
      2,
      8,
      18,
      4
    ],
    "en": 2.01,
    "mp": 938.25,
    "bp": 2833,
    "density": 5.323,
    "ox": "+4, +2",
    "discovered": "1886",
    "by": "Clemens Winkler",
    "summary": "Lustrous gray metalloid. First material used to create the transistor; now vital in fiber optics.",
    "uses": [
      "Fiber-Optic Core Cladding",
      "Infrared Night-Vision Optics",
      "Multi-Junction Space Solar Cells",
      "Polymerization Catalysts"
    ]
  },
  {
    "num": 33,
    "sym": "As",
    "name": "Arsenic",
    "mass": 74.922,
    "cat": "metalloid",
    "col": 15,
    "row": 4,
    "per": 4,
    "grp": 15,
    "phase": "Solid",
    "block": "p",
    "config": "[Ar] 3d¹⁰ 4s² 4p³",
    "shells": [
      2,
      8,
      18,
      5
    ],
    "en": 2.18,
    "mp": 817,
    "bp": 614,
    "density": 5.776,
    "ox": "+5, +3, -3",
    "discovered": "1250",
    "by": "Albertus Magnus",
    "summary": "Brittle steel-gray metalloid. Known historically as a poison; now vital in III-V compound semiconductors.",
    "uses": [
      "Gallium Arsenide (GaAs) RF Chips",
      "Semiconductor N-type Dopant",
      "Lead-Acid Battery Grid Hardening",
      "Specialty Optical Glasses"
    ]
  },
  {
    "num": 34,
    "sym": "Se",
    "name": "Selenium",
    "mass": 78.971,
    "cat": "nonmetal",
    "col": 16,
    "row": 4,
    "per": 4,
    "grp": 16,
    "phase": "Solid",
    "block": "p",
    "config": "[Ar] 3d¹⁰ 4s² 4p⁴",
    "shells": [
      2,
      8,
      18,
      6
    ],
    "en": 2.55,
    "mp": 221,
    "bp": 685,
    "density": 4.809,
    "ox": "+6, +4, -2",
    "discovered": "1817",
    "by": "Jöns Jacob Berzelius",
    "summary": "Photoconductive nonmetal whose electrical conductivity increases when exposed to light.",
    "uses": [
      "Photocopier Drums & Photoreceptors",
      "CIGS Thin-Film Solar Cells",
      "Glass Decolorization & Red Glazes",
      "Nutritional Dietary Supplements"
    ]
  },
  {
    "num": 35,
    "sym": "Br",
    "name": "Bromine",
    "mass": 79.904,
    "cat": "halogen",
    "col": 17,
    "row": 4,
    "per": 4,
    "grp": 17,
    "phase": "Liquid",
    "block": "p",
    "config": "[Ar] 3d¹⁰ 4s² 4p⁵",
    "shells": [
      2,
      8,
      18,
      7
    ],
    "en": 2.96,
    "mp": -7.2,
    "bp": 58.8,
    "density": 3.1028,
    "ox": "±1, +3, +5",
    "discovered": "1826",
    "by": "Antoine Jérôme Balard",
    "summary": "Deep red-brown volatile liquid at room temperature (only nonmetallic liquid element).",
    "uses": [
      "Flame-Retardant Electronics Materials",
      "Water Disinfection & Biocides",
      "Sedative Pharmaceuticals",
      "Deep Well Drilling Fluids"
    ]
  },
  {
    "num": 36,
    "sym": "Kr",
    "name": "Krypton",
    "mass": 83.798,
    "cat": "noble",
    "col": 18,
    "row": 4,
    "per": 4,
    "grp": 18,
    "phase": "Gas",
    "block": "p",
    "config": "[Ar] 3d¹⁰ 4s² 4p⁶",
    "shells": [
      2,
      8,
      18,
      8
    ],
    "en": 3,
    "mp": -157.36,
    "bp": -153.22,
    "density": 0.003733,
    "ox": "0, +2",
    "discovered": "1898",
    "by": "William Ramsay & Morris Travers",
    "summary": "Rare noble gas used in energy-saving lighting and specialized laser systems.",
    "uses": [
      "High-Efficiency Window Gas",
      "Airport Runway Strobe Lights",
      "Excimer Laser Lithography",
      "Spacecraft Ion Thrusters"
    ]
  },
  {
    "num": 37,
    "sym": "Rb",
    "name": "Rubidium",
    "mass": 85.468,
    "cat": "alkali",
    "col": 1,
    "row": 5,
    "per": 5,
    "grp": 1,
    "phase": "Solid",
    "block": "s",
    "config": "[Kr] 5s¹",
    "shells": [
      2,
      8,
      18,
      8,
      1
    ],
    "en": 0.82,
    "mp": 39.31,
    "bp": 688,
    "density": 1.532,
    "ox": "+1",
    "discovered": "1861",
    "by": "Robert Bunsen & Gustav Kirchhoff",
    "summary": "Highly reactive alkali metal with a very low melting point. Key frequency standard in GPS clocks.",
    "uses": [
      "Atomic Clocks & GPS Satellites",
      "Photocells & Vacuum Tubes",
      "Laser Cooling & BEC Physics",
      "Specialty Fiber Optics"
    ]
  },
  {
    "num": 38,
    "sym": "Sr",
    "name": "Strontium",
    "mass": 87.62,
    "cat": "alkaline",
    "col": 2,
    "row": 5,
    "per": 5,
    "grp": 2,
    "phase": "Solid",
    "block": "s",
    "config": "[Kr] 5s²",
    "shells": [
      2,
      8,
      18,
      8,
      2
    ],
    "en": 0.95,
    "mp": 777,
    "bp": 1382,
    "density": 2.64,
    "ox": "+2",
    "discovered": "1790",
    "by": "Adair Crawford",
    "summary": "Soft, silvery alkaline earth metal. Burns with a brilliant crimson flame.",
    "uses": [
      "Red Pyrotechnics & Flares",
      "Ultra-Precise Optical Lattice Clocks",
      "Ferrite Ceramic Magnets",
      "Strontium Ranelate (Bone Health)"
    ]
  },
  {
    "num": 39,
    "sym": "Y",
    "name": "Yttrium",
    "mass": 88.906,
    "cat": "transition",
    "col": 3,
    "row": 5,
    "per": 5,
    "grp": 3,
    "phase": "Solid",
    "block": "d",
    "config": "[Kr] 4d¹ 5s²",
    "shells": [
      2,
      8,
      18,
      9,
      2
    ],
    "en": 1.22,
    "mp": 1526,
    "bp": 3345,
    "density": 4.469,
    "ox": "+3",
    "discovered": "1794",
    "by": "Johan Gadolin",
    "summary": "Rare-earth transition metal. Core component of YAG lasers and high-temperature superconductors.",
    "uses": [
      "YAG Medical & Industrial Lasers",
      "YBCO Superconductors",
      "Thermal Barrier Jet Coatings",
      "White LED Phosphors"
    ]
  },
  {
    "num": 40,
    "sym": "Zr",
    "name": "Zirconium",
    "mass": 91.224,
    "cat": "transition",
    "col": 4,
    "row": 5,
    "per": 5,
    "grp": 4,
    "phase": "Solid",
    "block": "d",
    "config": "[Kr] 4d² 5s²",
    "shells": [
      2,
      8,
      18,
      10,
      2
    ],
    "en": 1.33,
    "mp": 1855,
    "bp": 4409,
    "density": 6.506,
    "ox": "+4",
    "discovered": "1789",
    "by": "Martin Heinrich Klaproth",
    "summary": "Extremely corrosion-resistant metal with very low neutron absorption cross-section.",
    "uses": [
      "Nuclear Fuel Rod Cladding (Zircaloy)",
      "Cubic Zirconia Synthetic Gems",
      "Ceramic Dental Crowns",
      "High-Temp Ceramic Refractories"
    ]
  },
  {
    "num": 41,
    "sym": "Nb",
    "name": "Niobium",
    "mass": 92.906,
    "cat": "transition",
    "col": 5,
    "row": 5,
    "per": 5,
    "grp": 5,
    "phase": "Solid",
    "block": "d",
    "config": "[Kr] 4d⁴ 5s¹",
    "shells": [
      2,
      8,
      18,
      12,
      1
    ],
    "en": 1.6,
    "mp": 2477,
    "bp": 4744,
    "density": 8.57,
    "ox": "+5, +3",
    "discovered": "1801",
    "by": "Charles Hatchett",
    "summary": "Ductile transition metal forming powerful superconducting magnets used in particle colliders and MRIs.",
    "uses": [
      "Superconducting MRI Magnets",
      "Rocket Nozzles & Gas Turbines",
      "Pipeline Microalloyed Steels",
      "Quantum Computing Qubits"
    ]
  },
  {
    "num": 42,
    "sym": "Mo",
    "name": "Molybdenum",
    "mass": 95.95,
    "cat": "transition",
    "col": 6,
    "row": 5,
    "per": 5,
    "grp": 6,
    "phase": "Solid",
    "block": "d",
    "config": "[Kr] 4d⁵ 5s¹",
    "shells": [
      2,
      8,
      18,
      13,
      1
    ],
    "en": 2.16,
    "mp": 2623,
    "bp": 4639,
    "density": 10.22,
    "ox": "+6",
    "discovered": "1778",
    "by": "Carl Wilhelm Scheele",
    "summary": "Refractory metal with one of the highest melting points, maintaining structural integrity at extreme heat.",
    "uses": [
      "High-Strength Military Steels",
      "Petroleum Desulfurization Catalysts",
      "Molybdenum Disulfide Lubricants",
      "Heating Elements & Electrodes"
    ]
  },
  {
    "num": 43,
    "sym": "Tc",
    "name": "Technetium",
    "mass": 98,
    "cat": "transition",
    "col": 7,
    "row": 5,
    "per": 5,
    "grp": 7,
    "phase": "Solid",
    "block": "d",
    "config": "[Kr] 4d⁵ 5s²",
    "shells": [
      2,
      8,
      18,
      13,
      2
    ],
    "en": 1.9,
    "mp": 2157,
    "bp": 4265,
    "density": 11.5,
    "ox": "+7, +4",
    "discovered": "1937",
    "by": "Emilio Segrè & Carlo Perrier",
    "summary": "First artificially created chemical element. Tc-99m is the world's most widely used medical radioisotope.",
    "uses": [
      "Medical Diagnostic SPECT Imaging",
      "Nuclear Medicine Radiotracers",
      "Corrosion Inhibit Studies",
      "Optoelectronic Calibration"
    ]
  },
  {
    "num": 44,
    "sym": "Ru",
    "name": "Ruthenium",
    "mass": 101.07,
    "cat": "transition",
    "col": 8,
    "row": 5,
    "per": 5,
    "grp": 8,
    "phase": "Solid",
    "block": "d",
    "config": "[Kr] 4d⁷ 5s¹",
    "shells": [
      2,
      8,
      18,
      15,
      1
    ],
    "en": 2.2,
    "mp": 2334,
    "bp": 4150,
    "density": 12.37,
    "ox": "+3, +4",
    "discovered": "1844",
    "by": "Karl Ernst Claus",
    "summary": "Rare platinum group metal used to harden platinum and palladium, and in electrical contact materials.",
    "uses": [
      "Hard Disk Drive Recording Layers",
      "Chlorine Generation Anodes (DSA)",
      "Solar Dye Catalysts (Grätzel)",
      "Wear-Resistant Contacts"
    ]
  },
  {
    "num": 45,
    "sym": "Rh",
    "name": "Rhodium",
    "mass": 102.91,
    "cat": "transition",
    "col": 9,
    "row": 5,
    "per": 5,
    "grp": 9,
    "phase": "Solid",
    "block": "d",
    "config": "[Kr] 4d⁸ 5s¹",
    "shells": [
      2,
      8,
      18,
      16,
      1
    ],
    "en": 2.28,
    "mp": 1964,
    "bp": 3695,
    "density": 12.41,
    "ox": "+3",
    "discovered": "1803",
    "by": "William Hyde Wollaston",
    "summary": "Extremely precious noble metal. Key component of automotive catalytic converters to destroy NOx emissions.",
    "uses": [
      "Auto Catalytic Converters",
      "Corrosion-Proof Jewelry Plating",
      "Chemical Hydrogenation Catalysts",
      "High-Temp Thermocouples"
    ]
  },
  {
    "num": 46,
    "sym": "Pd",
    "name": "Palladium",
    "mass": 106.42,
    "cat": "transition",
    "col": 10,
    "row": 5,
    "per": 5,
    "grp": 10,
    "phase": "Solid",
    "block": "d",
    "config": "[Kr] 4d¹⁰",
    "shells": [
      2,
      8,
      18,
      18
    ],
    "en": 2.2,
    "mp": 1554.9,
    "bp": 2963,
    "density": 12.02,
    "ox": "+2, +4",
    "discovered": "1803",
    "by": "William Hyde Wollaston",
    "summary": "Rare lustrous silvery-white metal capable of absorbing up to 900 times its own volume of hydrogen gas.",
    "uses": [
      "Automotive Catalytic Converters",
      "Multi-Layer Ceramic Capacitors",
      "Hydrogen Purification Filters",
      "White Gold Jewelry Alloys"
    ]
  },
  {
    "num": 47,
    "sym": "Ag",
    "name": "Silver",
    "mass": 107.87,
    "cat": "transition",
    "col": 11,
    "row": 5,
    "per": 5,
    "grp": 11,
    "phase": "Solid",
    "block": "d",
    "config": "[Kr] 4d¹⁰ 5s¹",
    "shells": [
      2,
      8,
      18,
      18,
      1
    ],
    "en": 1.93,
    "mp": 961.78,
    "bp": 2162,
    "density": 10.501,
    "ox": "+1",
    "discovered": "Ancient",
    "by": "Early Civilizations",
    "summary": "Metal with the highest electrical conductivity, thermal conductivity, and optical reflectivity of all elements.",
    "uses": [
      "Solar Panel Silver Paste (PV)",
      "Precision Electrical Contacts",
      "Bullion, Jewelry & Tableware",
      "Antimicrobial Wound Dressings"
    ]
  },
  {
    "num": 48,
    "sym": "Cd",
    "name": "Cadmium",
    "mass": 112.41,
    "cat": "transition",
    "col": 12,
    "row": 5,
    "per": 5,
    "grp": 12,
    "phase": "Solid",
    "block": "d",
    "config": "[Kr] 4d¹⁰ 5s²",
    "shells": [
      2,
      8,
      18,
      18,
      2
    ],
    "en": 1.69,
    "mp": 321.07,
    "bp": 767,
    "density": 8.69,
    "ox": "+2",
    "discovered": "1817",
    "by": "Karl Samuel Leberecht Hermann & Friedrich Stromeyer",
    "summary": "Soft, bluish-white metal used in rechargeable batteries, pigments, and corrosion-resistant coatings.",
    "uses": [
      "NiCd Rechargeable Batteries",
      "Cadmium Telluride (CdTe) Solar",
      "Nuclear Reactor Control Rods",
      "Brilliant Yellow/Red Pigments"
    ]
  },
  {
    "num": 49,
    "sym": "In",
    "name": "Indium",
    "mass": 114.82,
    "cat": "post-transition",
    "col": 13,
    "row": 5,
    "per": 5,
    "grp": 13,
    "phase": "Solid",
    "block": "p",
    "config": "[Kr] 4d¹⁰ 5s² 5p¹",
    "shells": [
      2,
      8,
      18,
      18,
      3
    ],
    "en": 1.78,
    "mp": 156.6,
    "bp": 2072,
    "density": 7.31,
    "ox": "+3",
    "discovered": "1863",
    "by": "Ferdinand Reich & Hieronymous Theodor Richter",
    "summary": "Very soft, malleable post-transition metal. Indium Tin Oxide (ITO) enables all modern touchscreens.",
    "uses": [
      "Touchscreens & Flat Panel Displays (ITO)",
      "Low-Melting Solders",
      "Cryogenic High-Vacuum Seals",
      "Semiconductor Heterojunctions"
    ]
  },
  {
    "num": 50,
    "sym": "Sn",
    "name": "Tin",
    "mass": 118.71,
    "cat": "post-transition",
    "col": 14,
    "row": 5,
    "per": 5,
    "grp": 14,
    "phase": "Solid",
    "block": "p",
    "config": "[Kr] 4d¹⁰ 5s² 5p²",
    "shells": [
      2,
      8,
      18,
      18,
      4
    ],
    "en": 1.96,
    "mp": 231.93,
    "bp": 2602,
    "density": 7.287,
    "ox": "+4, +2",
    "discovered": "Ancient",
    "by": "Bronze Age Civilizations",
    "summary": "Silvery malleable metal. Combined with copper to inaugurate the Bronze Age; primary electronics solder today.",
    "uses": [
      "Lead-Free Electronics Solder",
      "Food Packaging Tin Cans",
      "Float Glass Manufacturing",
      "Bronze & Pewter Alloys"
    ]
  },
  {
    "num": 51,
    "sym": "Sb",
    "name": "Antimony",
    "mass": 121.76,
    "cat": "metalloid",
    "col": 15,
    "row": 5,
    "per": 5,
    "grp": 15,
    "phase": "Solid",
    "block": "p",
    "config": "[Kr] 4d¹⁰ 5s² 5p³",
    "shells": [
      2,
      8,
      18,
      18,
      5
    ],
    "en": 2.05,
    "mp": 630.63,
    "bp": 1587,
    "density": 6.685,
    "ox": "+3, +5, -3",
    "discovered": "Ancient",
    "by": "Early Civilizations",
    "summary": "Lustrous gray metalloid. Used as flame retardant synergist and to harden lead-acid battery plates.",
    "uses": [
      "Halogen Flame Retardants (Sb2O3)",
      "Lead-Acid Battery Grids",
      "Infrared Thermal Detectors",
      "Phase-Change Memory (PCRAM)"
    ]
  },
  {
    "num": 52,
    "sym": "Te",
    "name": "Tellurium",
    "mass": 127.6,
    "cat": "metalloid",
    "col": 16,
    "row": 5,
    "per": 5,
    "grp": 16,
    "phase": "Solid",
    "block": "p",
    "config": "[Kr] 4d¹⁰ 5s² 5p⁴",
    "shells": [
      2,
      8,
      18,
      18,
      6
    ],
    "en": 2.1,
    "mp": 449.51,
    "bp": 988,
    "density": 6.232,
    "ox": "+4, +6, -2",
    "discovered": "1782",
    "by": "Franz-Joseph Müller von Reichenstein",
    "summary": "Brittle, mildly toxic metalloid. Key constituent of high-efficiency cadmium telluride solar modules.",
    "uses": [
      "CdTe Thin-Film Photovoltaics",
      "Thermoelectric Power Generators",
      "Machining Alloy Additive",
      "Rewritable Optical Discs"
    ]
  },
  {
    "num": 53,
    "sym": "I",
    "name": "Iodine",
    "mass": 126.9,
    "cat": "halogen",
    "col": 17,
    "row": 5,
    "per": 5,
    "grp": 17,
    "phase": "Solid",
    "block": "p",
    "config": "[Kr] 4d¹⁰ 5s² 5p⁵",
    "shells": [
      2,
      8,
      18,
      18,
      7
    ],
    "en": 2.66,
    "mp": 113.7,
    "bp": 184.3,
    "density": 4.93,
    "ox": "±1, +5, +7",
    "discovered": "1811",
    "by": "Bernard Courtois",
    "summary": "Dark violet-black solid halogen subliming into a purple vapor. Essential micronutrient for human thyroid.",
    "uses": [
      "Thyroid Health (Iodized Salt)",
      "Medical Antiseptic (Povidone)",
      "CT Scan X-ray Contrast Agents",
      "Polarizing Film for Displays"
    ]
  },
  {
    "num": 54,
    "sym": "Xe",
    "name": "Xenon",
    "mass": 131.29,
    "cat": "noble",
    "col": 18,
    "row": 5,
    "per": 5,
    "grp": 18,
    "phase": "Gas",
    "block": "p",
    "config": "[Kr] 4d¹⁰ 5s² 5p⁶",
    "shells": [
      2,
      8,
      18,
      18,
      8
    ],
    "en": 2.6,
    "mp": -111.7,
    "bp": -108.12,
    "density": 0.005887,
    "ox": "0, +2, +4, +6",
    "discovered": "1898",
    "by": "William Ramsay & Morris Travers",
    "summary": "Dense, heavy noble gas. Standard propellant for deep space satellite ion propulsion engines.",
    "uses": [
      "Satellite Ion Propulsion Thrusters",
      "IMAX & Cinema Projector Lamps",
      "Medical Neuroprotective Anesthetic",
      "Dark Matter WIMP Detectors"
    ]
  },
  {
    "num": 55,
    "sym": "Cs",
    "name": "Caesium",
    "mass": 132.91,
    "cat": "alkali",
    "col": 1,
    "row": 6,
    "per": 6,
    "grp": 1,
    "phase": "Solid",
    "block": "s",
    "config": "[Xe] 6s¹",
    "shells": [
      2,
      8,
      18,
      18,
      8,
      1
    ],
    "en": 0.79,
    "mp": 28.5,
    "bp": 671,
    "density": 1.873,
    "ox": "+1",
    "discovered": "1860",
    "by": "Robert Bunsen & Gustav Kirchhoff",
    "summary": "Most electropositive stable metal. The SI second is formally defined by 9,192,631,770 transitions of Cs-133.",
    "uses": [
      "Global Standard Atomic Clocks",
      "Deep Oil Drilling Fluids",
      "Photoelectric Multiplier Tubes",
      "Ion Propulsion Experimental Fuel"
    ]
  },
  {
    "num": 56,
    "sym": "Ba",
    "name": "Barium",
    "mass": 137.33,
    "cat": "alkaline",
    "col": 2,
    "row": 6,
    "per": 6,
    "grp": 2,
    "phase": "Solid",
    "block": "s",
    "config": "[Xe] 6s²",
    "shells": [
      2,
      8,
      18,
      18,
      8,
      2
    ],
    "en": 0.89,
    "mp": 727,
    "bp": 1897,
    "density": 3.594,
    "ox": "+2",
    "discovered": "1808",
    "by": "Humphry Davy",
    "summary": "Soft, silvery alkaline earth metal. Barium sulfate is opaque to X-rays and used for medical imaging.",
    "uses": [
      "Medical GI Barium Meal X-rays",
      "Oil & Gas Drilling Mud (Barite)",
      "Green Pyrotechnic Fireworks",
      "Getter in Vacuum Electronic Tubes"
    ]
  },
  {
    "num": 57,
    "sym": "La",
    "name": "Lanthanum",
    "mass": 138.91,
    "cat": "lanthanide",
    "col": 4,
    "row": 9,
    "per": 6,
    "grp": 3,
    "phase": "Solid",
    "block": "d",
    "config": "[Xe] 5d¹ 6s²",
    "shells": [
      2,
      8,
      18,
      18,
      9,
      2
    ],
    "en": 1.1,
    "mp": 920,
    "bp": 3464,
    "density": 6.145,
    "ox": "+3",
    "discovered": "1839",
    "by": "Carl Gustaf Mosander",
    "summary": "Prototype of the lanthanide series. Used in high-refractive camera lenses and hybrid car battery electrodes.",
    "uses": [
      "Hybrid Vehicle NiMH Batteries",
      "High-Index Camera Optical Glass",
      "Fluid Catalytic Petroleum Cracking",
      "Carbon Arc Studio Lighting"
    ]
  },
  {
    "num": 58,
    "sym": "Ce",
    "name": "Cerium",
    "mass": 140.12,
    "cat": "lanthanide",
    "col": 5,
    "row": 9,
    "per": 6,
    "grp": 3,
    "phase": "Solid",
    "block": "f",
    "config": "[Xe] 4f¹ 5d¹ 6s²",
    "shells": [
      2,
      8,
      18,
      19,
      9,
      2
    ],
    "en": 1.12,
    "mp": 798,
    "bp": 3443,
    "density": 6.77,
    "ox": "+3, +4",
    "discovered": "1803",
    "by": "Jöns Jacob Berzelius & Wilhelm Hisinger",
    "summary": "Most abundant rare-earth element. Cerium oxide is the premier polishing agent for precision optics and silicon.",
    "uses": [
      "Glass & Silicon Wafer Polishing (Ceria)",
      "Catalytic Converters (Oxygen Storage)",
      "Lighter Flints (Mischmetal)",
      "Self-Cleaning Oven Coatings"
    ]
  },
  {
    "num": 59,
    "sym": "Pr",
    "name": "Praseodymium",
    "mass": 140.91,
    "cat": "lanthanide",
    "col": 6,
    "row": 9,
    "per": 6,
    "grp": 3,
    "phase": "Solid",
    "block": "f",
    "config": "[Xe] 4f³ 6s²",
    "shells": [
      2,
      8,
      18,
      21,
      8,
      2
    ],
    "en": 1.13,
    "mp": 931,
    "bp": 3520,
    "density": 6.77,
    "ox": "+3",
    "discovered": "1885",
    "by": "Carl Auer von Welsbach",
    "summary": "Soft silvery rare-earth metal. Imparts intense yellow-green colors to glasses and strengthens magnets.",
    "uses": [
      "Didymium Glass Welder Goggles",
      "High-Strength NdFeB Permanent Magnets",
      "Aircraft Engine Magnesium Alloys",
      "Ceramic Enamel Yellow Color"
    ]
  },
  {
    "num": 60,
    "sym": "Nd",
    "name": "Neodymium",
    "mass": 144.24,
    "cat": "lanthanide",
    "col": 7,
    "row": 9,
    "per": 6,
    "grp": 3,
    "phase": "Solid",
    "block": "f",
    "config": "[Xe] 4f⁴ 6s²",
    "shells": [
      2,
      8,
      18,
      22,
      8,
      2
    ],
    "en": 1.14,
    "mp": 1024,
    "bp": 3074,
    "density": 7.01,
    "ox": "+3",
    "discovered": "1885",
    "by": "Carl Auer von Welsbach",
    "summary": "Critical element for the world's most powerful permanent magnets (NdFeB), driving EV motors and wind turbines.",
    "uses": [
      "EV Traction Motors & Wind Generators",
      "Computer Hard Drive Actuators",
      "Nd:YAG Surgery & Cutting Lasers",
      "Acoustic Speaker Transducers"
    ]
  },
  {
    "num": 61,
    "sym": "Pm",
    "name": "Promethium",
    "mass": 145,
    "cat": "lanthanide",
    "col": 8,
    "row": 9,
    "per": 6,
    "grp": 3,
    "phase": "Solid",
    "block": "f",
    "config": "[Xe] 4f⁵ 6s²",
    "shells": [
      2,
      8,
      18,
      23,
      8,
      2
    ],
    "en": 1.13,
    "mp": 1042,
    "bp": 3000,
    "density": 7.26,
    "ox": "+3",
    "discovered": "1945",
    "by": "Jacob A. Marinsky, Lawrence E. Glendenin, Charles D. Coryell",
    "summary": "Extremely rare radioactive lanthanide. Emits pure beta particles without harmful gamma rays.",
    "uses": [
      "Long-Life Beta-Photovoltaic Batteries",
      "Luminous Watch Dials",
      "Thickness Gauges",
      "Radioactive Heat Sources"
    ]
  },
  {
    "num": 62,
    "sym": "Sm",
    "name": "Samarium",
    "mass": 150.36,
    "cat": "lanthanide",
    "col": 9,
    "row": 9,
    "per": 6,
    "grp": 3,
    "phase": "Solid",
    "block": "f",
    "config": "[Xe] 4f⁶ 6s²",
    "shells": [
      2,
      8,
      18,
      24,
      8,
      2
    ],
    "en": 1.17,
    "mp": 1072,
    "bp": 1794,
    "density": 7.52,
    "ox": "+3, +2",
    "discovered": "1879",
    "by": "Paul-Émile Lecoq de Boisbaudran",
    "summary": "Hard rare-earth metal. Samarium-cobalt (SmCo) magnets retain magnetization at temperatures up to 300°C.",
    "uses": [
      "High-Temp SmCo Magnets (Aerospace)",
      "Nuclear Reactor Control Rods",
      "Cancer Radiotherapy (Quadramet)",
      "Specialty Infrared Absorbing Glass"
    ]
  },
  {
    "num": 63,
    "sym": "Eu",
    "name": "Europium",
    "mass": 151.96,
    "cat": "lanthanide",
    "col": 10,
    "row": 9,
    "per": 6,
    "grp": 3,
    "phase": "Solid",
    "block": "f",
    "config": "[Xe] 4f⁷ 6s²",
    "shells": [
      2,
      8,
      18,
      25,
      8,
      2
    ],
    "en": 1.2,
    "mp": 822,
    "bp": 1529,
    "density": 5.244,
    "ox": "+3, +2",
    "discovered": "1901",
    "by": "Eugène-Anatole Demarçay",
    "summary": "Most reactive lanthanide. Essential red and blue phosphor for displays and counterfeit-proof banknotes.",
    "uses": [
      "Euro Banknote Anti-Counterfeiting Phosphors",
      "Color TV & Smartphone Displays",
      "Quantum Memory Storage Crystals",
      "Fluorescent Biological Probes"
    ]
  },
  {
    "num": 64,
    "sym": "Gd",
    "name": "Gadolinium",
    "mass": 157.25,
    "cat": "lanthanide",
    "col": 11,
    "row": 9,
    "per": 6,
    "grp": 3,
    "phase": "Solid",
    "block": "f",
    "config": "[Xe] 4f⁷ 5d¹ 6s²",
    "shells": [
      2,
      8,
      18,
      25,
      9,
      2
    ],
    "en": 1.2,
    "mp": 1313,
    "bp": 3273,
    "density": 7.9,
    "ox": "+3",
    "discovered": "1880",
    "by": "Jean Charles Galissard de Marignac",
    "summary": "Paramagnetic lanthanide with the highest thermal neutron capture cross-section of any stable element.",
    "uses": [
      "MRI Intravenous Contrast Agents",
      "Nuclear Reactor Emergency Shutdown Rods",
      "Magnetocaloric Refrigeration",
      "Scintillators in Medical Imaging"
    ]
  },
  {
    "num": 65,
    "sym": "Tb",
    "name": "Terbium",
    "mass": 158.93,
    "cat": "lanthanide",
    "col": 12,
    "row": 9,
    "per": 6,
    "grp": 3,
    "phase": "Solid",
    "block": "f",
    "config": "[Xe] 4f⁹ 6s²",
    "shells": [
      2,
      8,
      18,
      27,
      8,
      2
    ],
    "en": 1.2,
    "mp": 1356,
    "bp": 3230,
    "density": 8.23,
    "ox": "+3, +4",
    "discovered": "1843",
    "by": "Carl Gustaf Mosander",
    "summary": "Silvery-white rare earth metal. Key component of Terfenol-D, the alloy with the highest magnetostriction.",
    "uses": [
      "Sonar & Magnetostrictive Transducers (Terfenol-D)",
      "Green Phosphor in High-Efficiency Displays",
      "High-Temp Permanent Magnet Stabilizers",
      "Solid-State Lasers"
    ]
  },
  {
    "num": 66,
    "sym": "Dy",
    "name": "Dysprosium",
    "mass": 162.5,
    "cat": "lanthanide",
    "col": 13,
    "row": 9,
    "per": 6,
    "grp": 3,
    "phase": "Solid",
    "block": "f",
    "config": "[Xe] 4f¹⁰ 6s²",
    "shells": [
      2,
      8,
      18,
      28,
      8,
      2
    ],
    "en": 1.22,
    "mp": 1412,
    "bp": 2567,
    "density": 8.55,
    "ox": "+3",
    "discovered": "1886",
    "by": "Paul-Émile Lecoq de Boisbaudran",
    "summary": "Metallic element with one of the highest magnetic strengths, preserving magnetism in hot EV engines.",
    "uses": [
      "High-Temp EV Motor Magnets",
      "Nuclear Reactor Neutron Control Rods",
      "Laser Material Host Crystals",
      "Terfenol-D Actuator Alloys"
    ]
  },
  {
    "num": 67,
    "sym": "Ho",
    "name": "Holmium",
    "mass": 164.93,
    "cat": "lanthanide",
    "col": 14,
    "row": 9,
    "per": 6,
    "grp": 3,
    "phase": "Solid",
    "block": "f",
    "config": "[Xe] 4f¹¹ 6s²",
    "shells": [
      2,
      8,
      18,
      29,
      8,
      2
    ],
    "en": 1.23,
    "mp": 1474,
    "bp": 2700,
    "density": 8.79,
    "ox": "+3",
    "discovered": "1878",
    "by": "Marc Delafontaine & Jacques-Louis Soret",
    "summary": "Element with the highest magnetic permeability. Used in magnetic flux concentrators and surgery lasers.",
    "uses": [
      "Holmium:YAG Medical Lasers (Kidney Stones)",
      "Magnetic Pole Concentrator Pieces",
      "Nuclear Absorber Control Rods",
      "Glass Spectrophotometer Calibration"
    ]
  },
  {
    "num": 68,
    "sym": "Er",
    "name": "Erbium",
    "mass": 167.26,
    "cat": "lanthanide",
    "col": 15,
    "row": 9,
    "per": 6,
    "grp": 3,
    "phase": "Solid",
    "block": "f",
    "config": "[Xe] 4f¹² 6s²",
    "shells": [
      2,
      8,
      18,
      30,
      8,
      2
    ],
    "en": 1.24,
    "mp": 1529,
    "bp": 2868,
    "density": 9.066,
    "ox": "+3",
    "discovered": "1843",
    "by": "Carl Gustaf Mosander",
    "summary": "Enables global transoceanic internet communication through Erbium-Doped Fiber Optical Amplifiers (EDFAs).",
    "uses": [
      "Erbium-Doped Fiber Amplifiers (EDFAs)",
      "Dermatology Cosmetic Lasers (Er:YAG)",
      "Pink Photographic Filters & Glass",
      "Nuclear Control Absorbers"
    ]
  },
  {
    "num": 69,
    "sym": "Tm",
    "name": "Thulium",
    "mass": 168.93,
    "cat": "lanthanide",
    "col": 16,
    "row": 9,
    "per": 6,
    "grp": 3,
    "phase": "Solid",
    "block": "f",
    "config": "[Xe] 4f¹³ 6s²",
    "shells": [
      2,
      8,
      18,
      31,
      8,
      2
    ],
    "en": 1.25,
    "mp": 1545,
    "bp": 1950,
    "density": 9.32,
    "ox": "+3",
    "discovered": "1879",
    "by": "Per Teodor Cleve",
    "summary": "Second-rarest naturally occurring lanthanide. Emits clean X-rays when irradiated in nuclear reactors.",
    "uses": [
      "Portable Field X-ray Machines",
      "Thulium Fiber Lasers for Surgery",
      "High-Temperature Ceramic Superconductors",
      "Euro Banknote Phosphors"
    ]
  },
  {
    "num": 70,
    "sym": "Yb",
    "name": "Ytterbium",
    "mass": 173.05,
    "cat": "lanthanide",
    "col": 17,
    "row": 9,
    "per": 6,
    "grp": 3,
    "phase": "Solid",
    "block": "f",
    "config": "[Xe] 4f¹⁴ 6s²",
    "shells": [
      2,
      8,
      18,
      32,
      8,
      2
    ],
    "en": 1.1,
    "mp": 819,
    "bp": 1196,
    "density": 6.9,
    "ox": "+3, +2",
    "discovered": "1878",
    "by": "Jean Charles Galissard de Marignac",
    "summary": "Soft, malleable rare-earth metal. Basis for state-of-the-art optical lattice atomic clocks.",
    "uses": [
      "Next-Gen Optical Atomic Clocks",
      "High-Power Industrial Fiber Lasers",
      "Stainless Steel Stress Sensor Probes",
      "Radiotherapy Seeds"
    ]
  },
  {
    "num": 71,
    "sym": "Lu",
    "name": "Lutetium",
    "mass": 174.97,
    "cat": "lanthanide",
    "col": 18,
    "row": 9,
    "per": 6,
    "grp": 3,
    "phase": "Solid",
    "block": "d",
    "config": "[Xe] 4f¹⁴ 5d¹ 6s²",
    "shells": [
      2,
      8,
      18,
      32,
      9,
      2
    ],
    "en": 1.27,
    "mp": 1663,
    "bp": 3402,
    "density": 9.84,
    "ox": "+3",
    "discovered": "1907",
    "by": "Georges Urbain",
    "summary": "Densest and hardest lanthanide metal. Lu-177 is a revolutionary targeted radiopharmaceutical for cancer.",
    "uses": [
      "Lu-177 Targeted Cancer Therapy (Pluvicto)",
      "PET Medical Scanner Detectors (LSO)",
      "Petroleum Refining Catalysts",
      "High-Index Optical Crystals"
    ]
  },
  {
    "num": 72,
    "sym": "Hf",
    "name": "Hafnium",
    "mass": 178.49,
    "cat": "transition",
    "col": 4,
    "row": 6,
    "per": 6,
    "grp": 4,
    "phase": "Solid",
    "block": "d",
    "config": "[Xe] 4f¹⁴ 5d² 6s²",
    "shells": [
      2,
      8,
      18,
      32,
      10,
      2
    ],
    "en": 1.3,
    "mp": 2233,
    "bp": 4603,
    "density": 13.31,
    "ox": "+4",
    "discovered": "1923",
    "by": "Dirk Coster & George de Hevesy",
    "summary": "Lustrous transition metal. High-k gate dielectric hafnium oxide enabled modern sub-45nm computer chips.",
    "uses": [
      "Microprocessor High-k Gate Dielectrics",
      "Nuclear Submarine Control Rods",
      "Plasma Cutting Torch Tips",
      "Rocket Superalloys"
    ]
  },
  {
    "num": 73,
    "sym": "Ta",
    "name": "Tantalum",
    "mass": 180.95,
    "cat": "transition",
    "col": 5,
    "row": 6,
    "per": 6,
    "grp": 5,
    "phase": "Solid",
    "block": "d",
    "config": "[Xe] 4f¹⁴ 5d³ 6s²",
    "shells": [
      2,
      8,
      18,
      32,
      11,
      2
    ],
    "en": 1.5,
    "mp": 3017,
    "bp": 5458,
    "density": 16.69,
    "ox": "+5",
    "discovered": "1802",
    "by": "Anders Gustaf Ekeberg",
    "summary": "Extremely corrosion-resistant metal. Essential for ultra-miniaturized electrolytic capacitors in smartphones.",
    "uses": [
      "Smartphone Tantalum Capacitors",
      "Biocompatible Surgical Bone Implants",
      "Chemical Acid Heat Exchangers",
      "Superalloy Jet Turbine Blades"
    ]
  },
  {
    "num": 74,
    "sym": "W",
    "name": "Tungsten",
    "mass": 183.84,
    "cat": "transition",
    "col": 6,
    "row": 6,
    "per": 6,
    "grp": 6,
    "phase": "Solid",
    "block": "d",
    "config": "[Xe] 4f¹⁴ 5d⁴ 6s²",
    "shells": [
      2,
      8,
      18,
      32,
      12,
      2
    ],
    "en": 2.36,
    "mp": 3422,
    "bp": 5555,
    "density": 19.25,
    "ox": "+6",
    "discovered": "1783",
    "by": "Fausto and Juan José de Elhuyar",
    "summary": "Element with the highest melting point of all metals (3422°C) and supreme tensile strength.",
    "uses": [
      "Tungsten Carbide Machining Cutting Tools",
      "Nuclear Fusion Reactor Divertor Tiles",
      "Rocket Exhaust Nozzles",
      "Incandescent Lamp Filaments"
    ]
  },
  {
    "num": 75,
    "sym": "Re",
    "name": "Rhenium",
    "mass": 186.21,
    "cat": "transition",
    "col": 7,
    "row": 6,
    "per": 6,
    "grp": 7,
    "phase": "Solid",
    "block": "d",
    "config": "[Xe] 4f¹⁴ 5d⁵ 6s²",
    "shells": [
      2,
      8,
      18,
      32,
      13,
      2
    ],
    "en": 1.9,
    "mp": 3186,
    "bp": 5596,
    "density": 21.02,
    "ox": "+7, +4",
    "discovered": "1925",
    "by": "Masataka Ogawa, Walter Noddack, Ida Tacke",
    "summary": "One of the rarest elements in Earth's crust. Added to nickel superalloys to endure combustion inside jet engines.",
    "uses": [
      "Jet Engine Turbine Blade Superalloys",
      "Lead-Free High-Octane Gasoline Catalysts",
      "Electrical Contact Switches",
      "Mass Spectrometer Filaments"
    ]
  },
  {
    "num": 76,
    "sym": "Os",
    "name": "Osmium",
    "mass": 190.23,
    "cat": "transition",
    "col": 8,
    "row": 6,
    "per": 6,
    "grp": 8,
    "phase": "Solid",
    "block": "d",
    "config": "[Xe] 4f¹⁴ 5d⁶ 6s²",
    "shells": [
      2,
      8,
      18,
      32,
      14,
      2
    ],
    "en": 2.2,
    "mp": 3033,
    "bp": 5012,
    "density": 22.59,
    "ox": "+4, +8",
    "discovered": "1803",
    "by": "Smithson Tennant",
    "summary": "Densest naturally occurring element on Earth (22.59 g/cm³), twice as dense as lead.",
    "uses": [
      "High-Wear Instrument Pivots & Styluses",
      "Fountain Pen Nibs & Compass Bearings",
      "Biological Tissue Staining (OsO4)",
      "Industrial Hydrogenation Catalysts"
    ]
  },
  {
    "num": 77,
    "sym": "Ir",
    "name": "Iridium",
    "mass": 192.22,
    "cat": "transition",
    "col": 9,
    "row": 6,
    "per": 6,
    "grp": 9,
    "phase": "Solid",
    "block": "d",
    "config": "[Xe] 4f¹⁴ 5d⁷ 6s²",
    "shells": [
      2,
      8,
      18,
      32,
      15,
      2
    ],
    "en": 2.2,
    "mp": 2446,
    "bp": 4428,
    "density": 22.56,
    "ox": "+4, +3",
    "discovered": "1803",
    "by": "Smithson Tennant",
    "summary": "Most corrosion-resistant metal known. Global iridium geological layer proved asteroid dinosaur extinction.",
    "uses": [
      "PEM Hydrogen Water Electrolyzers",
      "High-Temperature Spark Plugs",
      "Single-Crystal Growth Crucibles",
      "OLED Phosphorescent Emitters"
    ]
  },
  {
    "num": 78,
    "sym": "Pt",
    "name": "Platinum",
    "mass": 195.08,
    "cat": "transition",
    "col": 10,
    "row": 6,
    "per": 6,
    "grp": 10,
    "phase": "Solid",
    "block": "d",
    "config": "[Xe] 4f¹⁴ 5d⁹ 6s¹",
    "shells": [
      2,
      8,
      18,
      32,
      17,
      1
    ],
    "en": 2.28,
    "mp": 1768.3,
    "bp": 3825,
    "density": 21.45,
    "ox": "+4, +2",
    "discovered": "1735",
    "by": "Antonio de Ulloa",
    "summary": "Dense, malleable, precious noble metal. Supreme catalyst for green hydrogen fuel cells and anti-cancer chemotherapy.",
    "uses": [
      "Hydrogen Fuel Cell Catalysts",
      "Automotive Emissions Converters",
      "Cisplatin Cancer Chemotherapy",
      "Fine Luxury Jewelry & Watches"
    ]
  },
  {
    "num": 79,
    "sym": "Au",
    "name": "Gold",
    "mass": 196.97,
    "cat": "transition",
    "col": 11,
    "row": 6,
    "per": 6,
    "grp": 11,
    "phase": "Solid",
    "block": "d",
    "config": "[Xe] 4f¹⁴ 5d¹⁰ 6s¹",
    "shells": [
      2,
      8,
      18,
      32,
      18,
      1
    ],
    "en": 2.54,
    "mp": 1064.18,
    "bp": 2970,
    "density": 19.3,
    "ox": "+3, +1",
    "discovered": "Ancient",
    "by": "Early Civilizations",
    "summary": "Most malleable and ductile metal known. Impervious to air and moisture corrosion; timeless store of global value.",
    "uses": [
      "Global Reserve Currency & Jewelry",
      "Microchip Gold Bonding Wires",
      "Spacecraft Radiation Heat Shields",
      "Rapid Diagnostic Lateral Flow Tests"
    ]
  },
  {
    "num": 80,
    "sym": "Hg",
    "name": "Mercury",
    "mass": 200.59,
    "cat": "transition",
    "col": 12,
    "row": 6,
    "per": 6,
    "grp": 12,
    "phase": "Liquid",
    "block": "d",
    "config": "[Xe] 4f¹⁴ 5d¹⁰ 6s²",
    "shells": [
      2,
      8,
      18,
      32,
      18,
      2
    ],
    "en": 2,
    "mp": -38.83,
    "bp": 356.73,
    "density": 13.534,
    "ox": "+2, +1",
    "discovered": "Ancient",
    "by": "Early Civilizations",
    "summary": "The only metallic element that is liquid at standard temperature and pressure (quicksilver).",
    "uses": [
      "Fluorescent Lighting",
      "Scientific Barometers & Manometers",
      "Gold Amalgamation Mining",
      "Electrical Tilt Switches"
    ]
  },
  {
    "num": 81,
    "sym": "Tl",
    "name": "Thallium",
    "mass": 204.38,
    "cat": "post-transition",
    "col": 13,
    "row": 6,
    "per": 6,
    "grp": 13,
    "phase": "Solid",
    "block": "p",
    "config": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹",
    "shells": [
      2,
      8,
      18,
      32,
      18,
      3
    ],
    "en": 1.62,
    "mp": 304,
    "bp": 1473,
    "density": 11.85,
    "ox": "+1, +3",
    "discovered": "1861",
    "by": "William Crookes",
    "summary": "Soft, highly toxic post-transition metal. Used in infrared optical lenses and cardiovascular stress imaging.",
    "uses": [
      "Cardiovascular Myocardial Perfusion Scans (Tl-201)",
      "Infrared Transmitting Chalcogenide Glass",
      "High-Temperature Superconductors",
      "Low-Melting Solders"
    ]
  },
  {
    "num": 82,
    "sym": "Pb",
    "name": "Lead",
    "mass": 207.2,
    "cat": "post-transition",
    "col": 14,
    "row": 6,
    "per": 6,
    "grp": 14,
    "phase": "Solid",
    "block": "p",
    "config": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²",
    "shells": [
      2,
      8,
      18,
      32,
      18,
      4
    ],
    "en": 2.33,
    "mp": 327.46,
    "bp": 1749,
    "density": 11.34,
    "ox": "+2, +4",
    "discovered": "Ancient",
    "by": "Early Civilizations",
    "summary": "Dense, malleable, corrosion-resistant metal. Exceptional shield against ionizing X-ray and gamma radiation.",
    "uses": [
      "Lead-Acid Starter & Grid Batteries",
      "X-ray & Radiation Shielding",
      "Perovskite Solar Cell Crystals",
      "Acoustic Noise Dampening Panels"
    ]
  },
  {
    "num": 83,
    "sym": "Bi",
    "name": "Bismuth",
    "mass": 208.98,
    "cat": "post-transition",
    "col": 15,
    "row": 6,
    "per": 6,
    "grp": 15,
    "phase": "Solid",
    "block": "p",
    "config": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³",
    "shells": [
      2,
      8,
      18,
      32,
      18,
      5
    ],
    "en": 2.02,
    "mp": 271.3,
    "bp": 1564,
    "density": 9.78,
    "ox": "+3",
    "discovered": "1753",
    "by": "Claude François Geoffroy",
    "summary": "Non-toxic heavy metal with iridescent oxide hues and anomalous expansion upon freezing, like water.",
    "uses": [
      "Pepto-Bismol Stomach Relief",
      "Non-Toxic Lead Replacement Solders",
      "Automatic Fire Sprinkler Alloys",
      "Thermoelectric Peltier Coolers"
    ]
  },
  {
    "num": 84,
    "sym": "Po",
    "name": "Polonium",
    "mass": 209,
    "cat": "post-transition",
    "col": 16,
    "row": 6,
    "per": 6,
    "grp": 16,
    "phase": "Solid",
    "block": "p",
    "config": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴",
    "shells": [
      2,
      8,
      18,
      32,
      18,
      6
    ],
    "en": 2,
    "mp": 254,
    "bp": 962,
    "density": 9.196,
    "ox": "+4, +2",
    "discovered": "1898",
    "by": "Marie and Pierre Curie",
    "summary": "Rare, intensely radioactive metalloid named after Poland. Emits powerful alpha particles.",
    "uses": [
      "Anti-Static Brushes in Manufacturing",
      "Radioisotope Thermoelectric Generators (RTGs)",
      "Neutron Trigger Sources",
      "Atomic Research"
    ]
  },
  {
    "num": 85,
    "sym": "At",
    "name": "Astatine",
    "mass": 210,
    "cat": "halogen",
    "col": 17,
    "row": 6,
    "per": 6,
    "grp": 17,
    "phase": "Solid",
    "block": "p",
    "config": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵",
    "shells": [
      2,
      8,
      18,
      32,
      18,
      7
    ],
    "en": 2.2,
    "mp": 302,
    "bp": 337,
    "density": 6.35,
    "ox": "±1, +3, +5",
    "discovered": "1940",
    "by": "Dale R. Corson, Kenneth Ross MacKenzie, Emilio Segrè",
    "summary": "Rarest naturally occurring element on Earth (less than 1 gram in entire crust). Targeted alpha emitter in medicine.",
    "uses": [
      "Targeted Alpha Therapy for Cancer (At-211)",
      "Nuclear Medicine Research",
      "Radiolabeling Antibodies",
      "Nuclear Physics Probes"
    ]
  },
  {
    "num": 86,
    "sym": "Rn",
    "name": "Radon",
    "mass": 222,
    "cat": "noble",
    "col": 18,
    "row": 6,
    "per": 6,
    "grp": 18,
    "phase": "Gas",
    "block": "p",
    "config": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶",
    "shells": [
      2,
      8,
      18,
      32,
      18,
      8
    ],
    "en": 2.2,
    "mp": -71,
    "bp": -61.7,
    "density": 0.00973,
    "ox": "0, +2",
    "discovered": "1899",
    "by": "Ernest Rutherford & Robert B. Owens",
    "summary": "Dense radioactive noble gas formed from the natural radioactive decay of uranium in soil and rock.",
    "uses": [
      "Earthquake Prediction Gas Tracking",
      "Hydrological Ground Water Tracers",
      "Atmospheric Transport Tracking",
      "Cancer Radiation Seeds (historical)"
    ]
  },
  {
    "num": 87,
    "sym": "Fr",
    "name": "Francium",
    "mass": 223,
    "cat": "alkali",
    "col": 1,
    "row": 7,
    "per": 7,
    "grp": 1,
    "phase": "Solid",
    "block": "s",
    "config": "[Rn] 7s¹",
    "shells": [
      2,
      8,
      18,
      32,
      18,
      8,
      1
    ],
    "en": 0.7,
    "mp": 27,
    "bp": 677,
    "density": 1.87,
    "ox": "+1",
    "discovered": "1939",
    "by": "Marguerite Perey",
    "summary": "Second-rarest element in Earth's crust. Most unstable of first 101 elements with 22-minute half-life.",
    "uses": [
      "Atomic Laser Spectroscopy",
      "Testing Electroweak Interactions",
      "Fundamental Quantum Physics",
      "Nuclear Structure Models"
    ]
  },
  {
    "num": 88,
    "sym": "Ra",
    "name": "Radium",
    "mass": 226,
    "cat": "alkaline",
    "col": 2,
    "row": 7,
    "per": 7,
    "grp": 2,
    "phase": "Solid",
    "block": "s",
    "config": "[Rn] 7s²",
    "shells": [
      2,
      8,
      18,
      32,
      18,
      8,
      2
    ],
    "en": 0.9,
    "mp": 700,
    "bp": 1737,
    "density": 5.5,
    "ox": "+2",
    "discovered": "1898",
    "by": "Marie and Pierre Curie",
    "summary": "Intensely radioactive alkaline earth metal. Radium-223 is an FDA-approved targeted radiotherapy for bone metastases.",
    "uses": [
      "Bone Cancer Radiotherapy (Ra-223 Xofigo)",
      "Neutron Radiation Sources",
      "Historic Radiochemical Research",
      "Geochronological Ocean Dating"
    ]
  },
  {
    "num": 89,
    "sym": "Ac",
    "name": "Actinium",
    "mass": 227,
    "cat": "actinide",
    "col": 4,
    "row": 10,
    "per": 7,
    "grp": 3,
    "phase": "Solid",
    "block": "d",
    "config": "[Rn] 6d¹ 7s²",
    "shells": [
      2,
      8,
      18,
      32,
      18,
      9,
      2
    ],
    "en": 1.1,
    "mp": 1050,
    "bp": 3198,
    "density": 10.07,
    "ox": "+3",
    "discovered": "1899",
    "by": "André-Louis Debierne",
    "summary": "Silvery radioactive actinide. Actinium-225 is the revolutionary 'alpha-emitter' destroying targeted cancer cells.",
    "uses": [
      "Targeted Alpha Therapy Cancer Drugs (Ac-225)",
      "Neutron Sources",
      "Deep Ocean Circulation Tracers",
      "Thermoelectric Generators"
    ]
  },
  {
    "num": 90,
    "sym": "Th",
    "name": "Thorium",
    "mass": 232.04,
    "cat": "actinide",
    "col": 5,
    "row": 10,
    "per": 7,
    "grp": 3,
    "phase": "Solid",
    "block": "f",
    "config": "[Rn] 6d² 7s²",
    "shells": [
      2,
      8,
      18,
      32,
      18,
      10,
      2
    ],
    "en": 1.3,
    "mp": 1750,
    "bp": 4788,
    "density": 11.72,
    "ox": "+4",
    "discovered": "1828",
    "by": "Jöns Jacob Berzelius",
    "summary": "Naturally occurring radioactive element. Three times more abundant than uranium; candidate for safer molten salt reactors.",
    "uses": [
      "Molten Salt Thorium Nuclear Fuel (LFTR)",
      "High-Index Optical Camera Lenses",
      "TIG Welding Electrodes",
      "High-Temperature Ceramic Crucibles"
    ]
  },
  {
    "num": 91,
    "sym": "Pa",
    "name": "Protactinium",
    "mass": 231.04,
    "cat": "actinide",
    "col": 6,
    "row": 10,
    "per": 7,
    "grp": 3,
    "phase": "Solid",
    "block": "f",
    "config": "[Rn] 5f² 6d¹ 7s²",
    "shells": [
      2,
      8,
      18,
      32,
      20,
      9,
      2
    ],
    "en": 1.5,
    "mp": 1568,
    "bp": 4027,
    "density": 15.37,
    "ox": "+5, +4",
    "discovered": "1913",
    "by": "Kasimir Fajans & Oswald Helmuth Göhring",
    "summary": "Dense, highly radioactive silvery actinide formed as an intermediate in the thorium nuclear fuel cycle.",
    "uses": [
      "Sedimentary Geochronology & Ocean Dating",
      "Thorium Breeder Reactor Studies",
      "Nuclear Chemistry Research",
      "Actinide Speciation Probes"
    ]
  },
  {
    "num": 92,
    "sym": "U",
    "name": "Uranium",
    "mass": 238.03,
    "cat": "actinide",
    "col": 7,
    "row": 10,
    "per": 7,
    "grp": 3,
    "phase": "Solid",
    "block": "f",
    "config": "[Rn] 5f³ 6d¹ 7s²",
    "shells": [
      2,
      8,
      18,
      32,
      21,
      9,
      2
    ],
    "en": 1.38,
    "mp": 1132.2,
    "bp": 4131,
    "density": 19.1,
    "ox": "+6, +4",
    "discovered": "1789",
    "by": "Martin Heinrich Klaproth",
    "summary": "Heavy, dense radioactive element. U-235 is the primary fuel powering nuclear power plants producing carbon-free energy.",
    "uses": [
      "Nuclear Energy Generation (Commercial Power)",
      "Naval Nuclear Submarine Propulsion",
      "Depleted Uranium Armor Penetrator Shields",
      "Radioisotope Medical Isotope Production"
    ]
  },
  {
    "num": 93,
    "sym": "Np",
    "name": "Neptunium",
    "mass": 237,
    "cat": "actinide",
    "col": 8,
    "row": 10,
    "per": 7,
    "grp": 3,
    "phase": "Solid",
    "block": "f",
    "config": "[Rn] 5f⁴ 6d¹ 7s²",
    "shells": [
      2,
      8,
      18,
      32,
      22,
      9,
      2
    ],
    "en": 1.36,
    "mp": 644,
    "bp": 3902,
    "density": 20.45,
    "ox": "+5, +4",
    "discovered": "1940",
    "by": "Edwin McMillan & Philip H. Abelson",
    "summary": "First transuranic synthetic element discovered. Key precursor irradiated in reactors to produce Plutonium-238.",
    "uses": [
      "Precursor for Pu-238 Space Batteries",
      "High-Energy Neutron Detectors",
      "Nuclear Physics Probes",
      "Actinide Waste Transmutation"
    ]
  },
  {
    "num": 94,
    "sym": "Pu",
    "name": "Plutonium",
    "mass": 244,
    "cat": "actinide",
    "col": 9,
    "row": 10,
    "per": 7,
    "grp": 3,
    "phase": "Solid",
    "block": "f",
    "config": "[Rn] 5f⁶ 7s²",
    "shells": [
      2,
      8,
      18,
      32,
      24,
      8,
      2
    ],
    "en": 1.28,
    "mp": 640,
    "bp": 3228,
    "density": 19.86,
    "ox": "+4, +6",
    "discovered": "1940",
    "by": "Glenn T. Seaborg et al.",
    "summary": "Fissile transuranic element. Pu-238 supplies electricity to NASA deep space missions (Voyager, Curiosity, Perseverance).",
    "uses": [
      "NASA Deep Space RTG Nuclear Batteries",
      "Nuclear Deterrence Weapons (Pu-239)",
      "Fast Breeder Reactor MOX Fuel",
      "Heart Pacemaker Power (historical)"
    ]
  },
  {
    "num": 95,
    "sym": "Am",
    "name": "Americium",
    "mass": 243,
    "cat": "actinide",
    "col": 10,
    "row": 10,
    "per": 7,
    "grp": 3,
    "phase": "Solid",
    "block": "f",
    "config": "[Rn] 5f⁷ 7s²",
    "shells": [
      2,
      8,
      18,
      32,
      25,
      8,
      2
    ],
    "en": 1.13,
    "mp": 1176,
    "bp": 2011,
    "density": 13.67,
    "ox": "+3, +4",
    "discovered": "1944",
    "by": "Glenn T. Seaborg et al.",
    "summary": "Radioactive actinide. Americium-241 saves thousands of lives annually in residential ionization smoke detectors.",
    "uses": [
      "Residential Ionization Smoke Detectors (Am-241)",
      "Industrial Neutron Radiography Gauges",
      "Oil Well Drilling Loggers",
      "Spacecraft Radioisotope Power (ESA)"
    ]
  },
  {
    "num": 96,
    "sym": "Cm",
    "name": "Curium",
    "mass": 247,
    "cat": "actinide",
    "col": 11,
    "row": 10,
    "per": 7,
    "grp": 3,
    "phase": "Solid",
    "block": "f",
    "config": "[Rn] 5f⁷ 6d¹ 7s²",
    "shells": [
      2,
      8,
      18,
      32,
      25,
      9,
      2
    ],
    "en": 1.28,
    "mp": 1345,
    "bp": 3110,
    "density": 13.51,
    "ox": "+3",
    "discovered": "1944",
    "by": "Glenn T. Seaborg et al.",
    "summary": "Named after Marie and Pierre Curie. Powered Alpha Particle X-ray Spectrometers (APXS) on Mars Rovers.",
    "uses": [
      "Mars Rover Rock Chemical Analyzers (APXS)",
      "Target for Superheavy Element Synthesis",
      "Radioisotope Power Generators",
      "Actinide Magnetochemistry"
    ]
  },
  {
    "num": 97,
    "sym": "Bk",
    "name": "Berkelium",
    "mass": 247,
    "cat": "actinide",
    "col": 12,
    "row": 10,
    "per": 7,
    "grp": 3,
    "phase": "Solid",
    "block": "f",
    "config": "[Rn] 5f⁹ 7s²",
    "shells": [
      2,
      8,
      18,
      32,
      27,
      8,
      2
    ],
    "en": 1.3,
    "mp": 986,
    "bp": 2627,
    "density": 14.78,
    "ox": "+3, +4",
    "discovered": "1949",
    "by": "Glenn T. Seaborg et al.",
    "summary": "Synthesized at UC Berkeley. Crucial target material bombarded with calcium-48 to synthesize tennessine (117).",
    "uses": [
      "Synthesis Target for Tennessine (117)",
      "Actinide Chemistry Research",
      "High-Energy Nuclear Physics",
      "Crystal Structure Studies"
    ]
  },
  {
    "num": 98,
    "sym": "Cf",
    "name": "Californium",
    "mass": 251,
    "cat": "actinide",
    "col": 13,
    "row": 10,
    "per": 7,
    "grp": 3,
    "phase": "Solid",
    "block": "f",
    "config": "[Rn] 5f¹⁰ 7s²",
    "shells": [
      2,
      8,
      18,
      32,
      28,
      8,
      2
    ],
    "en": 1.3,
    "mp": 900,
    "bp": 1470,
    "density": 15.1,
    "ox": "+3",
    "discovered": "1950",
    "by": "Glenn T. Seaborg et al.",
    "summary": "Extremely potent neutron emitter. One microgram emits 2.3 million neutrons per second.",
    "uses": [
      "Nuclear Reactor Startup Neutron Sources",
      "Airport Luggage Explosives Detection",
      "Oil Well Coal & Ore Analyzers",
      "Cervical Cancer Brachytherapy"
    ]
  },
  {
    "num": 99,
    "sym": "Es",
    "name": "Einsteinium",
    "mass": 252,
    "cat": "actinide",
    "col": 14,
    "row": 10,
    "per": 7,
    "grp": 3,
    "phase": "Solid",
    "block": "f",
    "config": "[Rn] 5f¹¹ 7s²",
    "shells": [
      2,
      8,
      18,
      32,
      29,
      8,
      2
    ],
    "en": 1.3,
    "mp": 860,
    "bp": 996,
    "density": 8.84,
    "ox": "+3",
    "discovered": "1952",
    "by": "Albert Ghiorso et al.",
    "summary": "Named after Albert Einstein. Discovered in the debris of the first hydrogen bomb explosion ('Ivy Mike').",
    "uses": [
      "Synthesis of Mendelevium (101)",
      "Fundamental Actinide Bond Research",
      "Relativistic Heavy-Ion Physics",
      "Superheavy Element Bombardment"
    ]
  },
  {
    "num": 100,
    "sym": "Fm",
    "name": "Fermium",
    "mass": 257,
    "cat": "actinide",
    "col": 15,
    "row": 10,
    "per": 7,
    "grp": 3,
    "phase": "Solid",
    "block": "f",
    "config": "[Rn] 5f¹² 7s²",
    "shells": [
      2,
      8,
      18,
      32,
      30,
      8,
      2
    ],
    "en": 1.3,
    "mp": 1527,
    "bp": null,
    "density": 9.7,
    "ox": "+3",
    "discovered": "1952",
    "by": "Albert Ghiorso et al.",
    "summary": "Named after Enrico Fermi. Heaviest element that can be produced in macro quantities via neutron capture.",
    "uses": [
      "Heavy Element Synthesis Studies",
      "Nuclear Physics Nuclear Fission Probes",
      "Actinide Spectroscopy",
      "Chemical Affinity Research"
    ]
  },
  {
    "num": 101,
    "sym": "Md",
    "name": "Mendelevium",
    "mass": 258,
    "cat": "actinide",
    "col": 16,
    "row": 10,
    "per": 7,
    "grp": 3,
    "phase": "Solid",
    "block": "f",
    "config": "[Rn] 5f¹³ 7s²",
    "shells": [
      2,
      8,
      18,
      32,
      31,
      8,
      2
    ],
    "en": 1.3,
    "mp": 827,
    "bp": null,
    "density": 10.3,
    "ox": "+3, +2",
    "discovered": "1955",
    "by": "Albert Ghiorso, Glenn T. Seaborg et al.",
    "summary": "Named in honor of Dmitri Mendeleev, father of the periodic table. First element synthesized 'one atom at a time'.",
    "uses": [
      "Transactinide Precursor Physics",
      "Valence State Redox Chemistry",
      "Heavy Nuclear Decay Tracking",
      "Superheavy Ion Accelerator Tests"
    ]
  },
  {
    "num": 102,
    "sym": "No",
    "name": "Nobelium",
    "mass": 259,
    "cat": "actinide",
    "col": 17,
    "row": 10,
    "per": 7,
    "grp": 3,
    "phase": "Solid",
    "block": "f",
    "config": "[Rn] 5f¹⁴ 7s²",
    "shells": [
      2,
      8,
      18,
      32,
      32,
      8,
      2
    ],
    "en": 1.3,
    "mp": 827,
    "bp": null,
    "density": 9.9,
    "ox": "+2, +3",
    "discovered": "1958",
    "by": "Joint Institute for Nuclear Research & UC Berkeley",
    "summary": "Named after Alfred Nobel. Distinct for possessing a remarkably stable divalent (+2) oxidation state.",
    "uses": [
      "Relativistic Chemistry of 5f Shells",
      "Gas-Phase Chromatography Research",
      "Heavy Nuclear Stability Boundaries",
      "Nuclear Reaction Cross-Section Data"
    ]
  },
  {
    "num": 103,
    "sym": "Lr",
    "name": "Lawrencium",
    "mass": 266,
    "cat": "actinide",
    "col": 18,
    "row": 10,
    "per": 7,
    "grp": 3,
    "phase": "Solid",
    "block": "d",
    "config": "[Rn] 5f¹⁴ 7s² 7p¹",
    "shells": [
      2,
      8,
      18,
      32,
      32,
      8,
      3
    ],
    "en": 1.3,
    "mp": 1627,
    "bp": null,
    "density": 15.6,
    "ox": "+3",
    "discovered": "1961",
    "by": "Albert Ghiorso et al.",
    "summary": "Named after Ernest Lawrence, inventor of the cyclotron. Marks the final element of the actinide series.",
    "uses": [
      "Testing Actinide/Transactinide Boundary",
      "Relativistic p-Orbital Chemical Bonding",
      "Heavy-Ion Accelerator Experiments",
      "Nuclear Shell Models"
    ]
  },
  {
    "num": 104,
    "sym": "Rf",
    "name": "Rutherfordium",
    "mass": 267,
    "cat": "transition",
    "col": 4,
    "row": 7,
    "per": 7,
    "grp": 4,
    "phase": "Synthetic",
    "block": "d",
    "config": "[Rn] 5f¹⁴ 6d² 7s²",
    "shells": [
      2,
      8,
      18,
      32,
      32,
      10,
      2
    ],
    "en": null,
    "mp": 2100,
    "bp": 5500,
    "density": 23.2,
    "ox": "+4",
    "discovered": "1964",
    "by": "JINR & Lawrence Berkeley Lab",
    "summary": "First transactinide element. Confirms group 4 chemical periodicity despite severe relativistic electron shifts.",
    "uses": [
      "Transactinide Chemical Periodicity Research",
      "Relativistic Quantum Chemistry Verification",
      "Nuclear Fusion Cross-Section Physics",
      "Single-Atom Chemistry Automation"
    ]
  },
  {
    "num": 105,
    "sym": "Db",
    "name": "Dubnium",
    "mass": 268,
    "cat": "transition",
    "col": 5,
    "row": 7,
    "per": 7,
    "grp": 5,
    "phase": "Synthetic",
    "block": "d",
    "config": "[Rn] 5f¹⁴ 6d³ 7s²",
    "shells": [
      2,
      8,
      18,
      32,
      32,
      11,
      2
    ],
    "en": null,
    "mp": null,
    "bp": null,
    "density": 29.3,
    "ox": "+5",
    "discovered": "1968",
    "by": "JINR & Lawrence Berkeley Lab",
    "summary": "Named after Dubna, Russia, home of the Joint Institute for Nuclear Research.",
    "uses": [
      "Gas-Phase Chemical Chromatography",
      "Single-Atom Aqueous Chemistry Studies",
      "Superheavy Element Half-Life Mapping",
      "Spontaneous Fission Measurements"
    ]
  },
  {
    "num": 106,
    "sym": "Sg",
    "name": "Seaborgium",
    "mass": 269,
    "cat": "transition",
    "col": 6,
    "row": 7,
    "per": 7,
    "grp": 6,
    "phase": "Synthetic",
    "block": "d",
    "config": "[Rn] 5f¹⁴ 6d⁴ 7s²",
    "shells": [
      2,
      8,
      18,
      32,
      32,
      12,
      2
    ],
    "en": null,
    "mp": null,
    "bp": null,
    "density": 35,
    "ox": "+6",
    "discovered": "1974",
    "by": "Lawrence Berkeley Laboratory",
    "summary": "Named for Nobel laureate Glenn T. Seaborg while he was still living. Group 6 congener of tungsten.",
    "uses": [
      "Metal Carbonyl Chemistry (Sg(CO)6)",
      "Validating Hexavalent Periodic Trends",
      "Heavy-Ion Hot Fusion Reactions",
      "Nuclear Fission Barrier Research"
    ]
  },
  {
    "num": 107,
    "sym": "Bh",
    "name": "Bohrium",
    "mass": 270,
    "cat": "transition",
    "col": 7,
    "row": 7,
    "per": 7,
    "grp": 7,
    "phase": "Synthetic",
    "block": "d",
    "config": "[Rn] 5f¹⁴ 6d⁵ 7s²",
    "shells": [
      2,
      8,
      18,
      32,
      32,
      13,
      2
    ],
    "en": null,
    "mp": null,
    "bp": null,
    "density": 37.1,
    "ox": "+7",
    "discovered": "1981",
    "by": "GSI Helmholtz Centre for Heavy Ion Research",
    "summary": "Named in honor of Danish quantum physicist Niels Bohr. Group 7 homolog of rhenium.",
    "uses": [
      "Oxychloride Volatility Gas Chemistry",
      "Relativistic d-Electron Calculations",
      "Cold Fusion Nuclear Physics",
      "Heavy Element Decay Chains"
    ]
  },
  {
    "num": 108,
    "sym": "Hs",
    "name": "Hassium",
    "mass": 269,
    "cat": "transition",
    "col": 8,
    "row": 7,
    "per": 7,
    "grp": 8,
    "phase": "Synthetic",
    "block": "d",
    "config": "[Rn] 5f¹⁴ 6d⁶ 7s²",
    "shells": [
      2,
      8,
      18,
      32,
      32,
      14,
      2
    ],
    "en": null,
    "mp": null,
    "bp": null,
    "density": 40.7,
    "ox": "+8",
    "discovered": "1984",
    "by": "GSI Helmholtz Centre for Heavy Ion Research",
    "summary": "Named for the German state of Hesse. Forms volatile tetroxide HsO4 behaving like osmium tetroxide.",
    "uses": [
      "Thermodynamics of HsO4 Volatility",
      "Demonstrating Group 8 Periodic Trends",
      "Nuclear Shell Structure at N=162",
      "Accelerator Target Physics"
    ]
  },
  {
    "num": 109,
    "sym": "Mt",
    "name": "Meitnerium",
    "mass": 278,
    "cat": "transition",
    "col": 9,
    "row": 7,
    "per": 7,
    "grp": 9,
    "phase": "Synthetic",
    "block": "d",
    "config": "[Rn] 5f¹⁴ 6d⁷ 7s²",
    "shells": [
      2,
      8,
      18,
      32,
      32,
      15,
      2
    ],
    "en": null,
    "mp": null,
    "bp": null,
    "density": 37.4,
    "ox": "+9, +3",
    "discovered": "1982",
    "by": "GSI Helmholtz Centre for Heavy Ion Research",
    "summary": "Named after Lise Meitner, discoverer of nuclear fission. Heaviest member of group 9.",
    "uses": [
      "Nuclear Structure of Superheavy Nuclei",
      "Mapping Proton-Neutron Shell Closures",
      "Relativistic Spin-Orbit Couplings",
      "Cold Fusion Reaction Kinematics"
    ]
  },
  {
    "num": 110,
    "sym": "Ds",
    "name": "Darmstadtium",
    "mass": 281,
    "cat": "transition",
    "col": 10,
    "row": 7,
    "per": 7,
    "grp": 10,
    "phase": "Synthetic",
    "block": "d",
    "config": "[Rn] 5f¹⁴ 6d⁸ 7s²",
    "shells": [
      2,
      8,
      18,
      32,
      32,
      16,
      2
    ],
    "en": null,
    "mp": null,
    "bp": null,
    "density": 34.8,
    "ox": "+6, +4",
    "discovered": "1994",
    "by": "GSI Helmholtz Centre for Heavy Ion Research",
    "summary": "Named after Darmstadt, Germany. Member of group 10 sharing chemical kinship with platinum.",
    "uses": [
      "Relativistic Effect Quantification",
      "Superheavy Element Accelerator Experiments",
      "Nuclear Isomer Lifetime Studies",
      "Decay Spectroscopy"
    ]
  },
  {
    "num": 111,
    "sym": "Rg",
    "name": "Roentgenium",
    "mass": 282,
    "cat": "transition",
    "col": 11,
    "row": 7,
    "per": 7,
    "grp": 11,
    "phase": "Synthetic",
    "block": "d",
    "config": "[Rn] 5f¹⁴ 6d⁹ 7s²",
    "shells": [
      2,
      8,
      18,
      32,
      32,
      17,
      2
    ],
    "en": null,
    "mp": null,
    "bp": null,
    "density": 28.7,
    "ox": "+3, +5",
    "discovered": "1994",
    "by": "GSI Helmholtz Centre for Heavy Ion Research",
    "summary": "Named after Wilhelm Röntgen, discoverer of X-rays. Expected to be chemically analogous to gold.",
    "uses": [
      "Relativistic Contraction of s-Orbitals",
      "Coinage Metal Group Periodicity Testing",
      "Superheavy Alpha Decay Chronology",
      "Superconducting Recoil Separators"
    ]
  },
  {
    "num": 112,
    "sym": "Cn",
    "name": "Copernicium",
    "mass": 285,
    "cat": "transition",
    "col": 12,
    "row": 7,
    "per": 7,
    "grp": 12,
    "phase": "Synthetic",
    "block": "d",
    "config": "[Rn] 5f¹⁴ 6d¹⁰ 7s²",
    "shells": [
      2,
      8,
      18,
      32,
      32,
      18,
      2
    ],
    "en": null,
    "mp": 10,
    "bp": 67,
    "density": 23.7,
    "ox": "+2",
    "discovered": "1996",
    "by": "GSI Helmholtz Centre for Heavy Ion Research",
    "summary": "Named after Nicolaus Copernicus. Extremely volatile metal behaving like a noble gas due to relativistic effects.",
    "uses": [
      "Adsorption Chemistry on Gold Surfaces",
      "Testing Relativistic Closed-Shell Inertness",
      "Island of Stability Nuclear Research",
      "Transactinide Thermochromatography"
    ]
  },
  {
    "num": 113,
    "sym": "Nh",
    "name": "Nihonium",
    "mass": 286,
    "cat": "post-transition",
    "col": 13,
    "row": 7,
    "per": 7,
    "grp": 13,
    "phase": "Synthetic",
    "block": "p",
    "config": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹",
    "shells": [
      2,
      8,
      18,
      32,
      32,
      18,
      3
    ],
    "en": null,
    "mp": 430,
    "bp": 1130,
    "density": 16,
    "ox": "+1, +3",
    "discovered": "2004",
    "by": "RIKEN (Japan)",
    "summary": "First chemical element discovered in an Asian country (Japan). Group 13 post-transition element.",
    "uses": [
      "Single-Atom Gas Chromatography",
      "p-Block Relativistic Spin-Orbit Tests",
      "Heavy-Ion Linear Accelerator Physics",
      "Investigating Superheavy Shell Effects"
    ]
  },
  {
    "num": 114,
    "sym": "Fl",
    "name": "Flerovium",
    "mass": 289,
    "cat": "post-transition",
    "col": 14,
    "row": 7,
    "per": 7,
    "grp": 14,
    "phase": "Synthetic",
    "block": "p",
    "config": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²",
    "shells": [
      2,
      8,
      18,
      32,
      32,
      18,
      4
    ],
    "en": null,
    "mp": -73,
    "bp": 107,
    "density": 14,
    "ox": "+2",
    "discovered": "1998",
    "by": "JINR & Lawrence Livermore National Lab",
    "summary": "Named after Flerov Laboratory. Located at the shores of the theoretical 'Island of Stability'.",
    "uses": [
      "Testing the 'Island of Stability' Theory",
      "Gas-Phase Surface Interaction Studies",
      "Relativistic Nobel-Like Chemical Inertness",
      "Decay Chain Alpha Energetics"
    ]
  },
  {
    "num": 115,
    "sym": "Mc",
    "name": "Moscovium",
    "mass": 290,
    "cat": "post-transition",
    "col": 15,
    "row": 7,
    "per": 7,
    "grp": 15,
    "phase": "Synthetic",
    "block": "p",
    "config": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³",
    "shells": [
      2,
      8,
      18,
      32,
      32,
      18,
      5
    ],
    "en": null,
    "mp": 400,
    "bp": 1100,
    "density": 13.5,
    "ox": "+1, +3",
    "discovered": "2003",
    "by": "JINR & LLNL",
    "summary": "Named in honor of Moscow Oblast, Russia. Group 15 pnictogen with unusually stable monovalent (+1) state.",
    "uses": [
      "Exploring Superheavy Pnictogen Chemistry",
      "Hot-Fusion Nuclear Cross-Section Analysis",
      "Decay Daughter Characterization",
      "Nuclear Recoil Separator Calibration"
    ]
  },
  {
    "num": 116,
    "sym": "Lv",
    "name": "Livermorium",
    "mass": 293,
    "cat": "post-transition",
    "col": 16,
    "row": 7,
    "per": 7,
    "grp": 16,
    "phase": "Synthetic",
    "block": "p",
    "config": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴",
    "shells": [
      2,
      8,
      18,
      32,
      32,
      18,
      6
    ],
    "en": null,
    "mp": 435,
    "bp": 812,
    "density": 12.9,
    "ox": "+2, +4",
    "discovered": "2000",
    "by": "JINR & LLNL",
    "summary": "Named after Lawrence Livermore National Laboratory. Chalcogen congener of polonium.",
    "uses": [
      "Investigating Group 16 Relativistic Trends",
      "Synthesis of Superheavy Element Precursors",
      "Heavy Fission Valley Diagnostics",
      "Californium-48 Beam Interactions"
    ]
  },
  {
    "num": 117,
    "sym": "Ts",
    "name": "Tennessine",
    "mass": 294,
    "cat": "halogen",
    "col": 17,
    "row": 7,
    "per": 7,
    "grp": 17,
    "phase": "Synthetic",
    "block": "p",
    "config": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵",
    "shells": [
      2,
      8,
      18,
      32,
      32,
      18,
      7
    ],
    "en": null,
    "mp": 450,
    "bp": 610,
    "density": 7.2,
    "ox": "+1, +3, +5",
    "discovered": "2010",
    "by": "JINR, LLNL, Oak Ridge, Vanderbilt",
    "summary": "Named after Tennessee, home of Oak Ridge National Lab. Heaviest known halogen; expected to be a metalloid.",
    "uses": [
      "Relativistic Chemistry of Heavy Halogens",
      "Probing the N=184 Magic Neutron Shell",
      "Target-Projectile Fusion Physics",
      "Superheavy Ion Chemistry"
    ]
  },
  {
    "num": 118,
    "sym": "Og",
    "name": "Oganesson",
    "mass": 294,
    "cat": "noble",
    "col": 18,
    "row": 7,
    "per": 7,
    "grp": 18,
    "phase": "Synthetic",
    "block": "p",
    "config": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶",
    "shells": [
      2,
      8,
      18,
      32,
      32,
      18,
      8
    ],
    "en": null,
    "mp": 50,
    "bp": 80,
    "density": 5,
    "ox": "0, +2, +4",
    "discovered": "2002",
    "by": "JINR & LLNL",
    "summary": "Highest atomic number and highest atomic mass of any chemical element discovered to date. Named for Yuri Oganessian.",
    "uses": [
      "Boundary of the Periodic Table of Elements",
      "Testing the Thomas-Fermi Electron Gas Model",
      "Relativistic Electron Smearing Effects",
      "Future Period 8 Synthesis Planning"
    ]
  }
];

    const PT_CATEGORY_NAMES = {
      'alkali': 'Alkali Metal',
      'alkaline': 'Alkaline Earth Metal',
      'transition': 'Transition Metal',
      'post-transition': 'Post-Transition Metal',
      'metalloid': 'Metalloid',
      'nonmetal': 'Reactive Nonmetal',
      'halogen': 'Halogen',
      'noble': 'Noble Gas',
      'lanthanide': 'Lanthanide',
      'actinide': 'Actinide'
    };

    const PT_CATEGORY_COLORS = {
      'alkali': 'rose',
      'alkaline': 'amber',
      'transition': 'sky',
      'post-transition': 'indigo',
      'metalloid': 'teal',
      'nonmetal': 'emerald',
      'halogen': 'purple',
      'noble': 'pink',
      'lanthanide': 'yellow',
      'actinide': 'red'
    };

    function getPhaseBadge(phase) {
      if (phase === 'Gas') return { label: 'Gas 💨', class: 'bg-sky-500/10 text-sky-400 border-sky-500/30' };
      if (phase === 'Liquid') return { label: 'Liquid 💧', class: 'bg-blue-500/10 text-blue-400 border-blue-500/30' };
      if (phase === 'Synthetic') return { label: 'Synthetic ⚛️', class: 'bg-purple-500/10 text-purple-400 border-purple-500/30' };
      return { label: 'Solid 🪨', class: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
    }

    function getPhaseIcon(phase) {
      if (phase === 'Gas') return '💨';
      if (phase === 'Liquid') return '💧';
      if (phase === 'Synthetic') return '⚛️';
      return '';
    }

    function formatAtomicMass(mass) {
      if (typeof mass === 'number') {
        return mass % 1 === 0 ? mass.toString() : mass.toFixed(mass > 100 ? 2 : 3);
      }
      return mass || '';
    }

    function isElementMatchingFilters(el) {
      if (currentPtCategory !== 'all' && el.cat !== currentPtCategory) return false;
      if (currentPtPhase !== 'all' && el.phase !== currentPtPhase) return false;
      if (currentPtSearch) {
        const q = currentPtSearch.toLowerCase().trim();
        const numMatch = el.num.toString() === q || el.num.toString().startsWith(q);
        const symMatch = el.sym.toLowerCase() === q || el.sym.toLowerCase().startsWith(q);
        const nameMatch = el.name.toLowerCase().includes(q);
        const catMatch = (PT_CATEGORY_NAMES[el.cat] || '').toLowerCase().includes(q);
        const usesMatch = Array.isArray(el.uses) && el.uses.some(u => u.toLowerCase().includes(q));
        if (!numMatch && !symMatch && !nameMatch && !catMatch && !usesMatch) return false;
      }
      return true;
    }

    function renderPeriodicTable() {
      if (!ptGridContainer) return;
      ptGridContainer.innerHTML = '';

      let visibleCount = 0;

      // 1. Render all 118 Elements
      ELEMENTS_DATA.forEach(el => {
        const isMatch = isElementMatchingFilters(el);
        if (isMatch) visibleCount++;

        const isSelected = el.num === currentSelectedElement;
        const cell = document.createElement('div');
        cell.className = `pt-cell cat-${el.cat} ${isSelected ? 'pt-selected' : ''} ${isMatch ? '' : 'pt-dimmed'}`;
        cell.dataset.num = el.num;
        cell.style.gridColumn = el.col;
        cell.style.gridRow = el.row;
        cell.title = `${el.name} (${el.sym}), Atomic #${el.num} - ${PT_CATEGORY_NAMES[el.cat] || el.cat}`;

        cell.innerHTML = `
          <div class="flex items-center justify-between text-[8px] font-mono leading-none opacity-80 pointer-events-none">
            <span>${el.num}</span>
            <span class="text-[7px]">${getPhaseIcon(el.phase)}</span>
          </div>
          <div class="text-xs sm:text-sm font-bold text-center tracking-tight my-0.5 leading-none text-white pointer-events-none">${el.sym}</div>
          <div class="text-[7.5px] truncate text-center leading-none opacity-85 pointer-events-none">${el.name}</div>
          <div class="text-[6.5px] text-center font-mono opacity-70 leading-none mt-0.5 pointer-events-none">${formatAtomicMass(el.mass)}</div>
        `;

        cell.onclick = () => selectElement(el.num);
        ptGridContainer.appendChild(cell);
      });

      // 2. Lanthanides anchor button (col 3, row 6)
      const laAnchor = document.createElement('div');
      laAnchor.className = 'pt-cell border-yellow-500/40 bg-yellow-950/30 text-yellow-300 flex flex-col items-center justify-center text-center cursor-pointer hover:scale-105';
      laAnchor.style.gridColumn = '3';
      laAnchor.style.gridRow = '6';
      laAnchor.title = '57-71: Lanthanide Series';
      laAnchor.innerHTML = `
        <span class="text-[7.5px] font-mono text-yellow-400">57-71</span>
        <span class="text-[9px] font-bold">La-Lu</span>
        <span class="text-[6.5px] uppercase tracking-wider text-yellow-300">Lanthanides</span>
      `;
      laAnchor.onclick = () => {
        filterPtCategory('lanthanide');
        selectElement(57);
      };
      ptGridContainer.appendChild(laAnchor);

      // 3. Actinides anchor button (col 3, row 7)
      const acAnchor = document.createElement('div');
      acAnchor.className = 'pt-cell border-red-500/40 bg-red-950/30 text-red-300 flex flex-col items-center justify-center text-center cursor-pointer hover:scale-105';
      acAnchor.style.gridColumn = '3';
      acAnchor.style.gridRow = '7';
      acAnchor.title = '89-103: Actinide Series';
      acAnchor.innerHTML = `
        <span class="text-[7.5px] font-mono text-red-400">89-103</span>
        <span class="text-[9px] font-bold">Ac-Lr</span>
        <span class="text-[6.5px] uppercase tracking-wider text-red-300">Actinides</span>
      `;
      acAnchor.onclick = () => {
        filterPtCategory('actinide');
        selectElement(89);
      };
      ptGridContainer.appendChild(acAnchor);

      // 4. Spacer row (row 8)
      const spacer = document.createElement('div');
      spacer.style.gridColumn = '1 / span 18';
      spacer.style.gridRow = '8';
      spacer.style.height = '10px';
      spacer.className = 'pointer-events-none';
      ptGridContainer.appendChild(spacer);

      // Update counters
      if (ptCountDisplay) ptCountDisplay.textContent = `Showing ${visibleCount} / 118 Elements`;
    }

    function renderPeriodicList() {
      if (!ptListContainer) return;
      ptListContainer.innerHTML = '';

      let filtered = ELEMENTS_DATA.filter(isElementMatchingFilters);

      // Sorting
      if (currentPtSort === 'num-asc') filtered.sort((a, b) => a.num - b.num);
      else if (currentPtSort === 'mass-asc') filtered.sort((a, b) => (parseFloat(a.mass) || 0) - (parseFloat(b.mass) || 0));
      else if (currentPtSort === 'mass-desc') filtered.sort((a, b) => (parseFloat(b.mass) || 0) - (parseFloat(a.mass) || 0));
      else if (currentPtSort === 'en-desc') filtered.sort((a, b) => (b.en || 0) - (a.en || 0));
      else if (currentPtSort === 'name-asc') filtered.sort((a, b) => a.name.localeCompare(b.name));

      if (ptListCountDisplay) ptListCountDisplay.textContent = `Showing ${filtered.length} elements`;

      if (filtered.length === 0) {
        ptListContainer.innerHTML = '<div class="col-span-full py-12 text-center text-slate-500">No elements found matching your criteria.</div>';
        return;
      }

      filtered.forEach(el => {
        const isSelected = el.num === currentSelectedElement;
        const phase = getPhaseBadge(el.phase);
        const card = document.createElement('div');
        card.className = `p-3 rounded-xl border transition cursor-pointer flex flex-col justify-between gap-2 ${
          isSelected ? 'border-teal-400 bg-teal-950/30 shadow-lg shadow-teal-500/10' : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/60'
        }`;
        card.onclick = () => selectElement(el.num);

        card.innerHTML = `
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono font-bold text-slate-400">#${el.num}</span>
            <span class="text-[10px] px-2 py-0.5 rounded-full border font-medium ${phase.class}">${phase.label}</span>
          </div>
          <div class="flex items-center gap-2.5">
            <span class="text-2xl font-black text-white font-mono">${el.sym}</span>
            <div>
              <div class="font-bold text-slate-200 text-xs">${el.name}</div>
              <div class="text-[10px] text-slate-400">${PT_CATEGORY_NAMES[el.cat] || el.cat}</div>
            </div>
          </div>
          <div class="text-[11px] text-slate-400 line-clamp-2 leading-relaxed pt-1 border-t border-slate-800/80">
            ${el.summary}
          </div>
        `;
        ptListContainer.appendChild(card);
      });
    }

    function selectElement(num) {
      const el = ELEMENTS_DATA.find(e => e.num === num);
      if (!el) return;
      currentSelectedElement = num;

      // Update grid selection rings
      if (ptGridContainer) {
        ptGridContainer.querySelectorAll('.pt-cell').forEach(c => {
          c.classList.remove('pt-selected');
          if (parseInt(c.dataset.num, 10) === num) {
            c.classList.add('pt-selected');
          }
        });
      }

      // Update list view selection if rendered
      if (currentPtView === 'list') {
        renderPeriodicList();
      }

      // Render into Inspector
      if (!ptInspector) return;
      const phase = getPhaseBadge(el.phase);
      const catName = PT_CATEGORY_NAMES[el.cat] || el.cat;
      const catColor = PT_CATEGORY_COLORS[el.cat] || 'teal';

      // Visual Bohr Shell Rings / Bars breakdown
      const shellLabels = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];
      const maxShellCap = [2, 8, 18, 32, 50, 72, 98];
      let shellHtml = '';
      if (Array.isArray(el.shells)) {
        shellHtml = el.shells.map((count, idx) => {
          const cap = maxShellCap[idx] || 32;
          const pct = Math.min(100, Math.round((count / cap) * 100));
          return `
            <div class="flex items-center gap-1.5 text-[10px]">
              <span class="w-4 font-mono font-semibold text-slate-400">${shellLabels[idx]}:</span>
              <div class="flex-1 bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div class="bg-teal-400 h-full rounded-full transition-all duration-300" style="width: ${pct}%"></div>
              </div>
              <span class="w-5 text-right font-mono text-slate-300 font-bold">${count}</span>
            </div>
          `;
        }).join('');
      }

      const usesHtml = Array.isArray(el.uses) 
        ? el.uses.map(u => `<span class="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60 text-[10px]">${u}</span>`).join('') 
        : '';

      ptInspector.innerHTML = `
        <!-- Element Hero Header Card -->
        <div class="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-md relative overflow-hidden flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono font-bold text-teal-400 bg-teal-950/60 border border-teal-500/30 px-2 py-0.5 rounded-full">Atomic # ${el.num}</span>
            <span class="text-[10px] px-2 py-0.5 rounded-full border font-medium ${phase.class}">${phase.label}</span>
          </div>

          <div class="flex items-baseline justify-between pt-1">
            <div>
              <div class="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">${el.sym}</div>
              <h4 class="text-base sm:text-lg font-bold text-slate-100 tracking-tight mt-0.5">${el.name}</h4>
              <span class="text-[11px] font-medium text-${catColor}-400">${catName}</span>
            </div>
            <div class="text-right">
              <div class="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Atomic Mass</div>
              <div class="text-sm sm:text-base font-bold text-slate-200 font-mono">${formatAtomicMass(el.mass)} <span class="text-[10px] text-slate-400">u</span></div>
              <div class="text-[10px] text-slate-400 mt-1 font-mono">${el.block}-block &bull; Grp ${el.grp || 'f'} &bull; Per ${el.per}</div>
            </div>
          </div>

          <!-- Action Buttons Bar -->
          <div class="grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-800/80">
            <button onclick="speakElementDetails(${el.num})" class="py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white active:scale-95 transition flex items-center justify-center gap-1 text-[11px] font-medium" title="Read element details aloud">
              <span>🔊</span> <span>Listen</span>
            </button>
            <button onclick="copyElementSpecs(${el.num})" class="py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white active:scale-95 transition flex items-center justify-center gap-1 text-[11px] font-medium" title="Copy element details to clipboard">
              <span>📋</span> <span>Copy</span>
            </button>
            <button onclick="askAboutElement(${el.num})" class="py-1.5 px-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white active:scale-95 transition flex items-center justify-center gap-1 text-[11px] font-semibold shadow-sm shadow-teal-600/30" title="Ask NasInfinity AI about this element in chat">
              <span>💬</span> <span>Ask AI</span>
            </button>
          </div>
        </div>

        <!-- Summary & Context -->
        <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-300 leading-relaxed">
          ${el.summary}
        </div>

        <!-- Electron Configuration & Shell Distribution -->
        <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <span class="text-[10px] uppercase font-bold text-teal-400 tracking-wider">Electron Configuration</span>
            <span class="text-[10px] font-mono text-slate-400">Total: ${el.num} e⁻</span>
          </div>
          <div class="p-2 rounded-lg bg-slate-900 border border-slate-800/80 font-mono text-xs text-teal-300 font-semibold text-center select-all">
            ${el.config}
          </div>
          <div class="space-y-1 pt-1">
            <span class="text-[10px] text-slate-400 font-semibold block mb-1">Bohr Shell Occupancy:</span>
            ${shellHtml}
          </div>
        </div>

        <!-- Key Physical & Chemical Properties Grid -->
        <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col gap-2">
          <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Physical &amp; Chemical Properties</span>
          <div class="grid grid-cols-2 gap-2 text-[11px]">
            <div class="bg-slate-900/80 p-2 rounded-lg border border-slate-800/60">
              <span class="text-[9px] uppercase text-slate-500 font-semibold block">Electronegativity</span>
              <span class="font-bold text-slate-200 font-mono">${el.en !== null ? el.en + ' (Pauling)' : 'N/A'}</span>
            </div>
            <div class="bg-slate-900/80 p-2 rounded-lg border border-slate-800/60">
              <span class="text-[9px] uppercase text-slate-500 font-semibold block">Density</span>
              <span class="font-bold text-slate-200 font-mono">${el.density ? el.density + ' g/cm³' : 'N/A'}</span>
            </div>
            <div class="bg-slate-900/80 p-2 rounded-lg border border-slate-800/60">
              <span class="text-[9px] uppercase text-slate-500 font-semibold block">Melting Point</span>
              <span class="font-bold text-slate-200 font-mono">${el.mp !== null ? el.mp + ' °C' : 'N/A'}</span>
            </div>
            <div class="bg-slate-900/80 p-2 rounded-lg border border-slate-800/60">
              <span class="text-[9px] uppercase text-slate-500 font-semibold block">Boiling Point</span>
              <span class="font-bold text-slate-200 font-mono">${el.bp !== null ? el.bp + ' °C' : 'N/A'}</span>
            </div>
            <div class="col-span-2 bg-slate-900/80 p-2 rounded-lg border border-slate-800/60">
              <span class="text-[9px] uppercase text-slate-500 font-semibold block">Oxidation States</span>
              <span class="font-bold text-teal-300 font-mono">${el.ox || 'N/A'}</span>
            </div>
          </div>
        </div>

        <!-- History & Discovery -->
        <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col gap-1 text-[11px]">
          <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Discovery &amp; History</span>
          <div class="flex items-center justify-between text-slate-300">
            <span class="text-slate-400">Year:</span>
            <span class="font-bold text-slate-200">${el.discovered}</span>
          </div>
          <div class="flex items-center justify-between text-slate-300">
            <span class="text-slate-400">Discoverer:</span>
            <span class="font-bold text-slate-200 text-right">${el.by}</span>
          </div>
        </div>

        <!-- Key Applications & Uses -->
        <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col gap-2">
          <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Primary Applications</span>
          <div class="flex flex-wrap gap-1.5">
            ${usesHtml}
          </div>
        </div>
      `;
    }

    window.openPeriodicModal = function(initialSymbolOrNum) {
      if (!periodicModal) return;
      periodicModal.classList.remove('hidden');

      if (initialSymbolOrNum !== undefined && initialSymbolOrNum !== null) {
        let target = null;
        if (typeof initialSymbolOrNum === 'number') {
          target = ELEMENTS_DATA.find(e => e.num === initialSymbolOrNum);
        } else if (typeof initialSymbolOrNum === 'string') {
          const q = initialSymbolOrNum.trim().toLowerCase();
          target = ELEMENTS_DATA.find(e => e.sym.toLowerCase() === q || e.name.toLowerCase() === q || e.num.toString() === q);
        }
        if (target) {
          currentSelectedElement = target.num;
        }
      }

      renderPeriodicTable();
      selectElement(currentSelectedElement);

      if (ptSearchInput) {
        ptSearchInput.value = '';
        currentPtSearch = '';
      }
    };

    window.closePeriodicModal = function() {
      if (periodicModal) periodicModal.classList.add('hidden');
      if (window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };

    window.setPtView = function(viewType) {
      currentPtView = viewType;
      const gridBtn = document.getElementById('ptViewGridBtn');
      const listBtn = document.getElementById('ptViewListBtn');

      if (viewType === 'grid') {
        if (ptGridView) ptGridView.classList.remove('hidden');
        if (ptListView) ptListView.classList.add('hidden');
        if (gridBtn) { gridBtn.className = 'px-2 py-0.5 rounded font-medium bg-teal-600 text-white transition'; }
        if (listBtn) { listBtn.className = 'px-2 py-0.5 rounded font-medium text-slate-400 hover:text-white transition'; }
        renderPeriodicTable();
      } else {
        if (ptGridView) ptGridView.classList.add('hidden');
        if (ptListView) ptListView.classList.remove('hidden');
        if (listBtn) { listBtn.className = 'px-2 py-0.5 rounded font-medium bg-teal-600 text-white transition'; }
        if (gridBtn) { gridBtn.className = 'px-2 py-0.5 rounded font-medium text-slate-400 hover:text-white transition'; }
        renderPeriodicList();
      }
    };

    window.filterPtCategory = function(cat, btn) {
      currentPtCategory = cat;
      if (ptCategoryFilter) ptCategoryFilter.value = cat;

      document.querySelectorAll('.pt-filter-pill').forEach(p => {
        p.classList.remove('active', 'border-teal-500/50', 'bg-teal-950/60', 'text-teal-300', 'font-medium');
      });

      if (btn) {
        btn.classList.add('active', 'border-teal-500/50', 'bg-teal-950/60', 'text-teal-300', 'font-medium');
      }

      if (currentPtView === 'grid') renderPeriodicTable();
      else renderPeriodicList();
    };

    window.sortPtList = function(sortMode) {
      currentPtSort = sortMode;
      renderPeriodicList();
    };

    window.pickRandomElement = function() {
      const randomIdx = Math.floor(Math.random() * ELEMENTS_DATA.length);
      const el = ELEMENTS_DATA[randomIdx];
      selectElement(el.num);
    };

    window.askAboutElement = function(num) {
      const el = ELEMENTS_DATA.find(e => e.num === num);
      if (!el) return;
      closePeriodicModal();
      const ui = document.getElementById('userInput');
      if (ui) ui.value = `Tell me in detail about element ${el.name} (${el.sym}, Atomic Number ${el.num}): its electron configuration, discovery, chemical properties, and primary uses.`;
      if (typeof handleSendMessage === 'function') handleSendMessage();
      else if (typeof window.handleSendMessage === 'function') window.handleSendMessage();
    };

    window.copyElementSpecs = function(num) {
      const el = ELEMENTS_DATA.find(e => e.num === num);
      if (!el) return;
      const specs = `Element: ${el.name} (${el.sym})\nAtomic Number: ${el.num}\nAtomic Mass: ${el.mass} u\nCategory: ${PT_CATEGORY_NAMES[el.cat] || el.cat}\nPhase at STP: ${el.phase}\nElectron Configuration: ${el.config}\nElectronegativity: ${el.en || 'N/A'}\nMelting Point: ${el.mp !== null ? el.mp + ' °C' : 'N/A'}\nBoiling Point: ${el.bp !== null ? el.bp + ' °C' : 'N/A'}\nDensity: ${el.density || 'N/A'} g/cm³\nDiscovery: ${el.discovered} by ${el.by}\nKey Uses: ${Array.isArray(el.uses) ? el.uses.join(', ') : 'N/A'}\nSummary: ${el.summary}`;

      navigator.clipboard.writeText(specs).then(() => {
        showToast(`Copied details for ${el.name} (${el.sym}) to clipboard!`, 'success');
      }).catch(() => {
        showToast('Could not copy to clipboard.', 'error');
      });
    };

    window.speakElementDetails = function(num) {
      if (!('speechSynthesis' in window)) {
        return showToast('Text-to-speech is not supported in this browser.', 'warning');
      }
      const el = ELEMENTS_DATA.find(e => e.num === num);
      if (!el) return;

      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        return;
      }

      const textToRead = `${el.name}. Chemical symbol ${el.sym.split('').join(' ')}. Atomic number ${el.num}. Standard atomic mass ${el.mass} units. ${PT_CATEGORY_NAMES[el.cat] || el.cat}, ${el.phase} at room temperature. ${el.summary}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    };

    // Filter event listeners
    if (ptSearchInput) {
      ptSearchInput.addEventListener('input', (e) => {
        currentPtSearch = e.target.value;
        if (currentPtView === 'grid') renderPeriodicTable();
        else renderPeriodicList();
      });
    }

    if (ptCategoryFilter) {
      ptCategoryFilter.addEventListener('change', (e) => {
        currentPtCategory = e.target.value;
        if (currentPtView === 'grid') renderPeriodicTable();
        else renderPeriodicList();
      });
    }

    if (ptPhaseFilter) {
      ptPhaseFilter.addEventListener('change', (e) => {
        currentPtPhase = e.target.value;
        if (currentPtView === 'grid') renderPeriodicTable();
        else renderPeriodicList();
      });
    }

    // Keyboard navigation (ESC to close, Left/Right arrows to step through elements)
    window.addEventListener('keydown', (e) => {
      if (!periodicModal || periodicModal.classList.contains('hidden')) return;
      if (e.key === 'Escape') {
        closePeriodicModal();
      } else if (e.key === 'ArrowRight' && document.activeElement !== ptSearchInput) {
        if (currentSelectedElement < 118) selectElement(currentSelectedElement + 1);
      } else if (e.key === 'ArrowLeft' && document.activeElement !== ptSearchInput) {
        if (currentSelectedElement > 1) selectElement(currentSelectedElement - 1);
      }
    });

    // Helper functions for Conversational AI Element Dossier
    function findElementInQuery(text) {
      if (!text) return null;
      const t = text.trim().toLowerCase();

      // Check atomic number: "atomic number 79", "element 79", "element #79", "atomic # 79", "atomic no 79", "z = 79"
      const numMatch = t.match(/\b(?:atomic\s+(?:number|no|#)|element\s+#?|z\s*=\s*)\s*(\d{1,3})\b/i);
      if (numMatch) {
        const num = parseInt(numMatch[1], 10);
        if (num >= 1 && num <= 118) {
          return ELEMENTS_DATA.find(e => e.num === num) || null;
        }
      }

      // Explicit symbol queries: "symbol for potassium", "element Fe", "symbol Au", "chemical symbol O"
      const symMatch = t.match(/\b(?:chemical\s+symbol|symbol\s+for|element)\s+([a-zA-Z]{1,2})\b/i);
      if (symMatch) {
        const sym = symMatch[1].toUpperCase();
        const found = ELEMENTS_DATA.find(e => e.sym.toUpperCase() === sym);
        if (found) return found;
      }

      // Check element by full name
      const hasChemContext = /(element|periodic|chemistry|atomic|atom|chemical|molecule|compound|mass|valence|isotope|metal|gas|mineral|ore|symbol|allotrope|noble gas|halogen|alkali)/i.test(t);
      const ambiguousNames = new Set(['lead', 'iron', 'gold', 'silver', 'tin', 'mercury', 'neon', 'carbon']);

      for (const el of ELEMENTS_DATA) {
        const nameLower = el.name.toLowerCase();
        const nameRegex = new RegExp(`\\b${nameLower}\\b`, 'i');
        if (nameRegex.test(t)) {
          if (ambiguousNames.has(nameLower)) {
            // For common words like "lead", "iron", "gold", "silver", "tin", "mercury", only match if explicitly asking about the chemical element
            const isTargetedElementQuery = new RegExp(`^(what(\\s+is|'s)|tell\\s+me\\s+about|info\\s+on|explain|describe)?\\s*(the\\s+)?(element\\s+)?${nameLower}(\\s+(element|metal|gas|atom))?\\??$`, 'i').test(t);
            if (hasChemContext || isTargetedElementQuery) {
              return el;
            }
          } else {
            // Unambiguous names (e.g. titanium, helium, argon, uranium, potassium)
            const isSpecificTopic = new RegExp(`^(what(\\s+is|'s)|tell\\s+me\\s+about|info\\s+on|explain|describe)?\\s*(the\\s+)?${nameLower}\\??$`, 'i').test(t);
            if (hasChemContext || isSpecificTopic || t.length < 35) {
              return el;
            }
          }
        }
      }

      // Check for standalone symbols only if query has chemistry context
      const words = t.replace(/[^a-zA-Z0-9\s]/g, ' ').split(/\s+/);
      if (hasChemContext) {
        for (const word of words) {
          if (word.length >= 1 && word.length <= 2) {
            const found = ELEMENTS_DATA.find(e => e.sym.toLowerCase() === word.toLowerCase());
            if (found) return found;
          }
        }
      }

      return null;
    }

    function formatElementDossier(el) {
      const catName = PT_CATEGORY_NAMES[el.cat] || el.cat;
      const shellsStr = Array.isArray(el.shells) ? el.shells.join(', ') : 'N/A';
      const usesList = Array.isArray(el.uses) ? el.uses.map(u => '* 🚀 **' + u + '**').join('\n') : '';

      return '### 🧪 Element ' + el.num + ': ' + el.name + ' (' + el.sym + ') — ' + catName + '\n\n' +
        '| Property | Value |\n' +
        '| :--- | :--- |\n' +
        '| **Symbol & Atomic Number** | **' + el.sym + '** &bull; **' + el.num + '** |\n' +
        '| **Standard Atomic Mass** | ' + formatAtomicMass(el.mass) + ' u |\n' +
        '| **Category** | ' + catName + ' (Group ' + (el.grp || 'f') + ', Period ' + el.per + ', ' + el.block + '-block) |\n' +
        '| **Standard State at STP** | ' + el.phase + ' |\n' +
        '| **Electron Configuration** | `' + el.config + '` |\n' +
        '| **Electrons per Shell** | ' + shellsStr + ' |\n' +
        '| **Electronegativity** | ' + (el.en !== null ? el.en + ' (Pauling scale)' : 'N/A') + ' |\n' +
        '| **Melting / Boiling Point** | ' + (el.mp !== null ? el.mp + ' °C' : 'N/A') + ' / ' + (el.bp !== null ? el.bp + ' °C' : 'N/A') + ' |\n' +
        '| **Density** | ' + (el.density ? el.density + ' g/cm³' : 'N/A') + ' |\n' +
        '| **Common Oxidation States** | ' + (el.ox || 'N/A') + ' |\n' +
        '| **Discovery** | ' + el.discovered + ' by ' + el.by + ' |\n\n' +
        '#### 🔬 Chemical Overview & Behavior:\n' + el.summary + '\n\n' +
        '#### 🛠️ Primary Technological & Industrial Applications:\n' + usesList + '\n\n' +
        '> 💡 **Visual Exploration:** Click the **🧪 Periodic Table** button in the top navigation bar to inspect ' + el.name + '\'s electron shells, Bohr model distribution, and see its exact place among all 118 elements!';
    }

    function formatPeriodicTableOverview() {
      return '### 🧪 The Periodic Table of Elements (IUPAC Standard)\n\n' +
        'The **Periodic Table of Elements** organizes all 118 known chemical elements according to their atomic number ($Z$), electron configuration, and recurring chemical properties.\n\n' +
        '#### 📊 Table Architecture:\n' +
        '* **7 Periods (Horizontal Rows):** Corresponds to the highest occupied principal electron energy level ($n = 1$ to $7$).\n' +
        '* **18 Groups (Vertical Columns):** Elements in the same group share identical valence electron counts and exhibit similar chemical behaviors.\n' +
        '* **4 Orbital Blocks ($s, p, d, f$):** Indicates the subshell being filled across the periodic progression:\n' +
        '  * **s-block (Groups 1–2 + He):** Alkali & Alkaline earth metals.\n' +
        '  * **p-block (Groups 13–18):** Metalloids, nonmetals, halogens, noble gases.\n' +
        '  * **d-block (Groups 3–12):** Transition metals.\n' +
        '  * **f-block (Lanthanides & Actinides):** Rare-earth elements and superheavy actinides placed at the bottom.\n\n' +
        '#### 📈 Universal Periodic Trends:\n' +
        '| Trend | Left &rarr; Right Across Period | Down &darr; A Group |\n' +
        '| :--- | :--- | :--- |\n' +
        '| **Atomic Radius** | 🔻 Decreases (higher effective nuclear charge $Z_{\\text{eff}}$) | 🔺 Increases (new electron shells added) |\n' +
        '| **Ionization Energy** | 🔺 Increases (electrons held more tightly) | 🔻 Decreases (valence electrons further from nucleus) |\n' +
        '| **Electronegativity** | 🔺 Increases (peaks at Fluorine = 3.98) | 🔻 Decreases |\n' +
        '| **Metallic Character** | 🔻 Decreases (metals &rarr; metalloids &rarr; nonmetals) | 🔺 Increases |\n\n' +
        '#### 🔬 The 10 Major Element Categories:\n' +
        '| Category | Characteristics | Key Examples |\n' +
        '| :--- | :--- | :--- |\n' +
        '| **Alkali Metals** | Highly reactive, single valence electron, soft | Lithium (Li), Sodium (Na), Potassium (K) |\n' +
        '| **Alkaline Earth** | Reactive, +2 oxidation state, good conductors | Magnesium (Mg), Calcium (Ca), Barium (Ba) |\n' +
        '| **Transition Metals** | Hard, high melting point, variable oxidation states | Iron (Fe), Copper (Cu), Titanium (Ti), Gold (Au) |\n' +
        '| **Lanthanides** | Rare-earth elements, critical for magnets & lasers | Neodymium (Nd), Europium (Eu), Erbium (Er) |\n' +
        '| **Actinides** | All radioactive, nuclear fuels & space power | Uranium (U), Plutonium (Pu), Americium (Am) |\n' +
        '| **Post-Transition** | Soft, ductile metals with lower melting points | Aluminium (Al), Tin (Sn), Lead (Pb), Bismuth (Bi) |\n' +
        '| **Metalloids** | Intermediate properties, premier semiconductors | Silicon (Si), Germanium (Ge), Boron (B) |\n' +
        '| **Reactive Nonmetals** | Diverse phases, electronegative, life elements | Carbon (C), Nitrogen (N), Oxygen (O), Sulfur (S) |\n' +
        '| **Halogens** | Highly reactive, form salts, 7 valence electrons | Fluorine (F), Chlorine (Cl), Bromine (Br), Iodine (I) |\n' +
        '| **Noble Gases** | Chemically inert, closed-shell octets, glow in discharge | Helium (He), Neon (Ne), Argon (Ar), Xenon (Xe) |\n\n' +
        '> 🧪 **Explore Live in NasInfinity AI:**\n' +
        '> Click the **🧪 Periodic Table** button in the top navigation bar to open the interactive Periodic Table Studio. You can search, filter by phase, inspect electron shells, and copy atomic data for all 118 elements!';
    }

    function generatePeriodicTableCodeResponse() {
      const codeLines = [
        '<!DOCTYPE html>',
        '<html lang="en">',
        '<head>',
        '  <meta charset="UTF-8">',
        '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
        '  <title>Interactive Periodic Table</title>',
        '  <style>',
        '    * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, sans-serif; }',
        '    body { background: #0b0f19; color: #f1f5f9; min-height: 100vh; padding: 20px; display: flex; flex-direction: column; align-items: center; }',
        '    .header { text-align: center; margin-bottom: 20px; }',
        '    .header h1 { font-size: 1.75rem; color: #2dd4bf; margin-bottom: 6px; }',
        '    .header p { font-size: 0.85rem; color: #94a3b8; }',
        '    .toolbar { display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap; justify-content: center; }',
        '    input, select { background: #1e293b; border: 1px solid #334155; color: #f8fafc; padding: 8px 12px; border-radius: 8px; font-size: 0.85rem; outline: none; }',
        '    input:focus, select:focus { border-color: #2dd4bf; }',
        '    .table-container { width: 100%; max-width: 1000px; overflow-x: auto; background: #0f172a; padding: 16px; border-radius: 16px; border: 1px solid #1e293b; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }',
        '    .grid { display: grid; grid-template-columns: repeat(18, minmax(46px, 1fr)); gap: 4px; min-width: 860px; }',
        '    .cell { border: 1px solid #334155; border-radius: 6px; padding: 4px; display: flex; flex-direction: column; justify-content: space-between; min-height: 54px; cursor: pointer; transition: all 0.15s; background: rgba(30, 41, 59, 0.6); }',
        '    .cell:hover { transform: translateY(-3px) scale(1.08); z-index: 10; box-shadow: 0 10px 20px rgba(0,0,0,0.6); }',
        '    .cell.selected { border-color: #2dd4bf !important; box-shadow: 0 0 12px rgba(45, 212, 191, 0.6); }',
        '    .cell.dimmed { opacity: 0.2; }',
        '    .num { font-size: 9px; color: #94a3b8; font-family: monospace; }',
        '    .sym { font-size: 14px; font-weight: 800; text-align: center; }',
        '    .name { font-size: 8px; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #cbd5e1; }',
        '    .nonmetal { border-color: #10b981; color: #6ee7b7; }',
        '    .noble { border-color: #ec4899; color: #f472b6; }',
        '    .alkali { border-color: #f43f5e; color: #fda4af; }',
        '    .alkaline { border-color: #f59e0b; color: #fcd34d; }',
        '    .transition { border-color: #0ea5e9; color: #7dd3fc; }',
        '    .post-transition { border-color: #6366f1; color: #a5b4fc; }',
        '    .metalloid { border-color: #14b8a6; color: #5eead4; }',
        '    .halogen { border-color: #a855f7; color: #d8b4fe; }',
        '    .lanthanide { border-color: #eab308; color: #fde047; }',
        '    .actinide { border-color: #ef4444; color: #fca5a5; }',
        '    .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: none; align-items: center; justify-content: center; padding: 20px; z-index: 50; }',
        '    .modal-card { background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 24px; max-width: 420px; width: 100%; box-shadow: 0 25px 50px rgba(0,0,0,0.7); }',
        '    .modal-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px; }',
        '    .modal-close { background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer; }',
        '    .modal-prop { display: flex; justify-content: space-between; font-size: 12px; padding: 6px 0; border-bottom: 1px solid #334155; }',
        '  </style>',
        '</head>',
        '<body>',
        '  <div class="header">',
        '    <h1>🧪 Interactive Periodic Table</h1>',
        '    <p>118 Elements &bull; Search by name, symbol or atomic number</p>',
        '  </div>',
        '  <div class="toolbar">',
        '    <input id="search" type="text" placeholder="Search (Gold, Fe, 79)...">',
        '    <select id="catFilter">',
        '      <option value="all">All Categories</option>',
        '      <option value="alkali">Alkali Metals</option>',
        '      <option value="alkaline">Alkaline Earth</option>',
        '      <option value="transition">Transition Metals</option>',
        '      <option value="post-transition">Post-Transition</option>',
        '      <option value="metalloid">Metalloids</option>',
        '      <option value="nonmetal">Nonmetals</option>',
        '      <option value="halogen">Halogens</option>',
        '      <option value="noble">Noble Gases</option>',
        '      <option value="lanthanide">Lanthanides</option>',
        '      <option value="actinide">Actinides</option>',
        '    </select>',
        '  </div>',
        '  <div class="table-container">',
        '    <div id="grid" class="grid"></div>',
        '  </div>',
        '  <div id="modal" class="modal" onclick="if(event.target===this) this.style.display=\'none\'">',
        '    <div class="modal-card">',
        '      <div class="modal-header">',
        '        <div>',
        '          <span id="mNum" style="font-size: 12px; color: #2dd4bf; font-family: monospace;"></span>',
        '          <h2 id="mName" style="color: white;"></h2>',
        '        </div>',
        '        <button class="modal-close" onclick="document.getElementById(\'modal\').style.display=\'none\'">&times;</button>',
        '      </div>',
        '      <div id="mProps"></div>',
        '    </div>',
        '  </div>',
        '  <script>',
        '    const rawData = ' + JSON.stringify(elements.map(e => ({
          num: e.num,
          sym: e.sym,
          name: e.name,
          mass: e.mass,
          cat: e.cat,
          col: e.col,
          row: e.row,
          config: e.config,
          phase: e.phase,
          summary: e.summary
        }))) + ';',
        '    const grid = document.getElementById("grid");',
        '    const search = document.getElementById("search");',
        '    const catFilter = document.getElementById("catFilter");',
        '    function render() {',
        '      grid.innerHTML = "";',
        '      const q = search.value.toLowerCase().trim();',
        '      const cat = catFilter.value;',
        '      rawData.forEach(el => {',
        '        const matches = (cat === "all" || el.cat === cat) &&',
        '          (!q || el.name.toLowerCase().includes(q) || el.sym.toLowerCase().includes(q) || el.num.toString() === q);',
        '        const d = document.createElement("div");',
        '        d.className = "cell " + el.cat + (matches ? "" : " dimmed");',
        '        d.style.gridColumn = el.col;',
        '        d.style.gridRow = el.row;',
        '        d.innerHTML = "<span class=\"num\">" + el.num + "</span><span class=\"sym\">" + el.sym + "</span><span class=\"name\">" + el.name + "</span>";',
        '        d.onclick = () => showModal(el);',
        '        grid.appendChild(d);',
        '      });',
        '    }',
        '    function showModal(el) {',
        '      document.getElementById("mNum").textContent = "Atomic Number " + el.num;',
        '      document.getElementById("mName").textContent = el.name + " (" + el.sym + ")";',
        '      document.getElementById("mProps").innerHTML =',
        '        "<div class=\"modal-prop\"><span>Standard Atomic Mass:</span><strong>" + el.mass + " u</strong></div>" +',
        '        "<div class=\"modal-prop\"><span>Category:</span><strong>" + el.cat + "</strong></div>" +',
        '        "<div class=\"modal-prop\"><span>Phase at STP:</span><strong>" + el.phase + "</strong></div>" +',
        '        "<div class=\"modal-prop\"><span>Configuration:</span><code>" + el.config + "</code></div>" +',
        '        "<div style=\"font-size: 12px; color: #94a3b8; margin-top: 12px; line-height: 1.5;\">" + el.summary + "</div>";',
        '      document.getElementById("modal").style.display = "flex";',
        '    }',
        '    search.addEventListener("input", render);',
        '    catFilter.addEventListener("change", render);',
        '    render();',
        '  <\/script>',
        '</body>',
        '</html>'
      ].join('\n');

      return '### 🧪 Interactive Periodic Table Web App Code\n\n' +
        'Here is a complete, self-contained interactive Periodic Table application built with **HTML, CSS, and modern JavaScript**.\n\n' +
        '> 💡 **Live Preview:** Click the **▶ Run / Preview Live** button on the code card below to explore, search, and inspect chemical elements interactively right now inside NasInfinity AI!\n\n' +
        '```html\n' + codeLines + '\n```';
    }

    // Attach helpers globally for Conversational AI
    if (typeof window !== 'undefined') {
      window.findElementInQuery = findElementInQuery;
      window.formatElementDossier = formatElementDossier;
      window.formatPeriodicTableOverview = formatPeriodicTableOverview;
    }
    if (typeof global !== 'undefined') {
      global.findElementInQuery = findElementInQuery;
      global.formatElementDossier = formatElementDossier;
      global.formatPeriodicTableOverview = formatPeriodicTableOverview;
    }

