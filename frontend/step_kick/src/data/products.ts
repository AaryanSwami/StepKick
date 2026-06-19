export type Product = {
  id: string;
  name: string;
  tag: string;
  price: number;
  img: string;
  colors: string[];
  colorNames?: string[]; // user-friendly names for colors
  description?: string;
  features?: string[];
};

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Atrium Low",
    tag: "Everyday Leather",
    price: 168,
    img: "/shoes/shoes1.png",
    colors: ["#f4ecdf", "#1c1c1c", "#1f3a5f"],
    colorNames: ["Parchment", "Obsidian", "Pacific"],
    description: "A refined take on the classic tennis silhouette. Handmade in Portugal from buttery full-grain Italian leather, featuring a stitched Margom rubber sole and fully lined with calfskin.",
    features: [
      "Goodyear-welted construction for durability and resoling",
      "Supple Italian calfskin lining that molds to your foot",
      "Stitched Margom rubber cupsole",
      "Handmade in Porto, Portugal"
    ]
  },
  {
    id: "2",
    name: "Ridge Runner 02",
    tag: "Trail Performance",
    price: 224,
    img: "/shoes/shoes2.png",
    colors: ["#1c1c1c", "#7a7468"],
    colorNames: ["Triple Black", "Desert Sand"],
    description: "Built for the wild, styled for the city. The Ridge Runner features a water-resistant Cordura® upper, Vibram® Megagrip outsole, and a reinforced TPU mudguard to withstand any element.",
    features: [
      "Vibram® Megagrip rubber compound outsole",
      "Water-resistant Cordura® ballistic nylon upper",
      "Responsive EVA midsole with nylon stability shank",
      "Gusseted tongue to keep out trail debris"
    ]
  },
  {
    id: "3",
    name: "Heritage 77 Suede",
    tag: "Archive Edition",
    price: 195,
    img: "/shoes/shoes3.png",
    colors: ["#c45a26", "#3d3a36", "#e7dccb"],
    colorNames: ["Terracotta", "Slate", "Oatmeal"],
    description: "A vintage-inspired silhouette straight from our 1977 archive. Reconstructed with premium hairy English suede, an ultra-cushioned crepe rubber sole, and retro collegiate detailing.",
    features: [
      "Premium hairy English suede upper",
      "All-natural plantation crepe rubber outsole",
      "Removable cork-topped Ortholite foam insole",
      "Retro canvas-lined interior"
    ]
  },
  {
    id: "4",
    name: "Drift Knit",
    tag: "Lightweight Run",
    price: 152,
    img: "/shoes/shoes4.png",
    colors: ["#a3b58b", "#1c1c1c"],
    colorNames: ["Sage", "Slate Black"],
    description: "Unparalleled breathability and zero-waste construction. The Drift Knit is knitted from 100% recycled ocean plastics, offering a glove-like fit that feels like a second skin.",
    features: [
      "100% recycled ocean plastic knit upper",
      "Algae-blend Bloom foam cushioning",
      "Flexible, slip-resistant recycled rubber pod outsole",
      "Machine washable on gentle cycle"
    ]
  },
  {
    id: "5",
    name: "Court Mono",
    tag: "Tennis Classic",
    price: 138,
    img: "/shoes/shoes5.png",
    colors: ["#1f3a5f", "#f4ecdf"],
    colorNames: ["Navy Mono", "Chalk White"],
    description: "A sleek, monochromatic minimal trainer designed for everyday rotation. Made with premium matte leather and subtle embossed branding, it provides understated sophistication.",
    features: [
      "Premium matte-finish cowhide leather",
      "Subtle hot-stamped gold foil branding details",
      "Breathable perforated side ventilation",
      "Reinforced double-stitched heel counter"
    ]
  },
  {
    id: "6",
    name: "Camp Boot Lo",
    tag: "All-Terrain",
    price: 248,
    img: "/shoes/shoes6.png",
    colors: ["#9b6a3f", "#3d3a36"],
    colorNames: ["Chestnut", "Mud Grey"],
    description: "The ruggedness of a classic work boot combined with the comfort of a low-top sneaker. Featuring oiled nubuck leather that develops a rich patina over time.",
    features: [
      "Waterproof oiled nubuck leather from gold-rated tanneries",
      " Goodyear welt storm construction",
      "Rugged commando-tread rubber outsole",
      "Speed-lacing brass hardware"
    ]
  }
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
