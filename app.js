
/* ═══════════════════════════════════════════
   USALINK PWA — CLEAN JS (no nested backticks)
═══════════════════════════════════════════ */

/* ─── NAVIGATION ─── */
var currentPage = 'page-home';
function goPage(id) {
  document.querySelectorAll('.page').forEach(function(p){ p.classList.remove('active'); });
  var pg = document.getElementById(id);
  if (pg) { pg.classList.add('active'); pg.scrollTop = 0; }
  currentPage = id;
  var map = {'page-home':'bn-home','page-stores':'bn-stores','page-track':'bn-track','page-calc':'bn-calc','page-account':'bn-account','page-ai':'bn-ai'};
  document.querySelectorAll('.bn-item').forEach(function(b){ b.classList.remove('active'); });
  var bn = document.getElementById(map[id]);
  if (bn) bn.classList.add('active');
  /* hide float btn on AI page */
  var fab = document.getElementById('aiFloatBtn');
  if (fab) fab.style.display = (id === 'page-ai') ? 'none' : 'flex';
}

/* ─── STORE STATE ─── */
var storeCat  = 'all';
var storeView = 'appstore';
var favs = [];
try { favs = JSON.parse(localStorage.getItem('ul_favs3') || '[]'); } catch(e){}
function saveFavs(){ try{ localStorage.setItem('ul_favs3', JSON.stringify(favs)); }catch(e){} }
function favIcon(id){ return favs.includes(id) ? '❤️' : '♡'; }
function toggleFav(e, id){
  e.stopPropagation();
  favs = favs.includes(id) ? favs.filter(function(f){ return f!==id; }) : favs.concat([id]);
  saveFavs();
  renderStores();
}

/* ─── STORES DATA ─── */
var STORES = [
  {id:'coachoutlet',   name:'Coach Outlet',         cat:'outlets',      catLabel:'Outlets',              bg:'linear-gradient(135deg,#1a0a00,#8b5c2a)', badge:'hot',  rating:4.7, url:'https://www.coach.com/outlet',               desc:'Bolsos, accesorios y ropa Coach a precios de outlet. Ahorra hasta 70%.',                                    perks:['👜 Bolsos premium','💰 Hasta 70% off','🎀 Accesorios','✈ Envío directo']},
  {id:'shopsimon',     name:'ShopSimon',             cat:'outlets',      catLabel:'Outlets',              bg:'linear-gradient(135deg,#0a1a3d,#1e3a8a)', badge:'hot',  rating:4.6, url:'https://www.shopsimon.com/',                  desc:'El marketplace oficial de los Premium Outlets de Simon. Marcas de lujo a precio outlet.',                   perks:['🏬 Premium Outlets','🌟 Lujo outlet','💳 Miles de marcas','📦 Envío USALINK']},
  {id:'rlfactory',     name:'RL Factory',            cat:'outlets',      catLabel:'Outlets',              bg:'linear-gradient(135deg,#002a5e,#1a4a8a)', badge:'sale', rating:4.7, url:'https://www.ralphlauren.com/factory-stores', desc:'Ralph Lauren Factory: elegancia a precios reducidos. Polo, clásicos y accesorios.',                          perks:['🐎 Ralph Lauren','💰 Precios factory','👔 Polo & clásicos','🎁 Gift sets']},
  {id:'nikefactory',   name:'Nike Factory',          cat:'outlets',      catLabel:'Outlets',              bg:'linear-gradient(135deg,#111,#333)',        badge:'hot',  rating:4.8, url:'https://www.nike.com/nike-factory-store',    desc:'Sneakers y ropa Nike a precios de outlet. Air Max, Jordan clásicos con hasta 60% off.',                      perks:['👟 Nike outlet','🏃 Ropa deportiva','⚡ Hasta 60% off','🎽 Todas las tallas']},
  {id:'nordstromrack', name:'Nordstrom Rack',        cat:'outlets',      catLabel:'Outlets',              bg:'linear-gradient(135deg,#1a0a30,#2d1a50)', badge:'hot',  rating:4.7, url:'https://www.nordstromrack.com/',             desc:'La versión outlet de Nordstrom. Marcas de diseñador a precios reducidos hasta 70%.',                         perks:['🌟 Diseñador outlet','💰 Hasta 70% off','👠 Moda premium','🛍️ Deals diarios']},
  {id:'marshalls',     name:'Marshalls',             cat:'outlets',      catLabel:'Outlets',              bg:'linear-gradient(135deg,#b22222,#7a0000)', badge:'sale', rating:4.5, url:'https://www.marshalls.com/',                  desc:'Marcas de nombre a precios increíblemente bajos. Nuevos productos cada semana.',                              perks:['🏷️ Precios bajos','👗 Ropa de marca','🏠 Hogar','🔄 Stock semanal']},
  {id:'tjmaxx',        name:'TJ Maxx',               cat:'outlets',      catLabel:'Outlets',              bg:'linear-gradient(135deg,#8b0000,#cc2200)', badge:'sale', rating:4.6, url:'https://www.tjmaxx.tjx.com/',                desc:'Calidad a precios hasta 60% menos. Moda, hogar, belleza en un solo lugar.',                                  perks:['💸 60% menos','👗 Marcas calidad','🏠 Hogar','💄 Belleza']},
  {id:'burlington',    name:'Burlington',            cat:'outlets',      catLabel:'Outlets',              bg:'linear-gradient(135deg,#003366,#0055aa)', badge:null,   rating:4.4, url:'https://www.burlington.com/',                desc:'Ropa familiar y hogar a precios de ganga. Hasta 65% off todos los días.',                                    perks:['👨‍👩‍👦 Toda familia','💰 Hasta 65% off','🏠 Hogar','🎉 Deals diarios']},
  {id:'katespade',     name:'Kate Spade Outlet',     cat:'outlets',      catLabel:'Outlets',              bg:'linear-gradient(135deg,#cc0066,#880044)', badge:'hot',  rating:4.7, url:'https://www.katespade.com/sale',             desc:'Bolsos y accesorios Kate Spade a precios de outlet. Estilo neoyorquino chic.',                               perks:['👜 Kate Spade','🌸 Estilo NYC','💰 Precio outlet','🎀 Regalo perfecto']},
  {id:'michaelkors',   name:'Michael Kors Outlet',   cat:'outlets',      catLabel:'Outlets',              bg:'linear-gradient(135deg,#c8a000,#7a6000)', badge:'sale', rating:4.6, url:'https://www.michaelkors.com/sale',           desc:'Bolsos, relojes y accesorios MK a precios especiales. Hasta 50% off.',                                       perks:['⌚ Relojes MK','👜 Bolsos premium','💰 Hasta 50% off','✈ Envío casillero']},
  {id:'calvinklein',   name:'Calvin Klein Outlet',   cat:'outlets',      catLabel:'Outlets',              bg:'linear-gradient(135deg,#222,#555)',        badge:null,   rating:4.5, url:'https://www.calvinklein.com/en_US/sale',    desc:'Ropa, ropa interior y fragancias CK con grandes descuentos.',                                                perks:['🩲 CK Underwear','👗 Ropa premium','🌹 Fragancias CK','💰 Sale permanente']},
  {id:'tommyoutlet',   name:'Tommy Hilfiger Outlet', cat:'outlets',      catLabel:'Outlets',              bg:'linear-gradient(135deg,#c8102e,#001a5e)', badge:'sale', rating:4.6, url:'https://www.tommy.com/en/sale',              desc:'Estilo Tommy Hilfiger a precios de outlet. Polos, jeans y accesorios con descuento.',                        perks:['🇺🇸 Tommy style','👕 Polos & camisas','💰 Precio outlet','🎽 Toda la línea']},
  {id:'saksoff5th',    name:'Saks OFF 5TH',          cat:'outlets',      catLabel:'Outlets',              bg:'linear-gradient(135deg,#1a1a1a,#4a4a4a)', badge:'hot',  rating:4.8, url:'https://www.saksoff5th.com/',                desc:'Outlet de Saks Fifth Avenue. Diseñadores de lujo con hasta 70% de descuento.',                               perks:['🌟 Lujo con descuento','👠 Diseñador shoes','💄 Belleza premium','💰 Hasta 70% off']},
  {id:'zara',          name:'Zara',                  cat:'moda',         catLabel:'Moda & Ropa',          bg:'linear-gradient(135deg,#1a1a1a,#555)',     badge:'hot',  rating:4.7, url:'https://www.zara.com/us/',                  desc:'Las últimas tendencias europeas. Colecciones que renuevan cada dos semanas.',                                perks:['🔥 Tendencias semanales','👔 H/M/Niño','✈ Consolidamos','💳 Sin membresía']},
  {id:'hm',            name:'H&M',                   cat:'moda',         catLabel:'Moda & Ropa',          bg:'linear-gradient(135deg,#c8102e,#8b0020)', badge:'sale', rating:4.5, url:'https://www.hm.com/us/',                    desc:'Moda accesible y sostenible. Básicos clásicos y colabs exclusivas.',                                         perks:['💰 Precios bajos','🌱 Colección eco','👨‍👩‍👧 Familia','🎨 Colabs']},
  {id:'uniqlo',        name:'UNIQLO',                cat:'moda',         catLabel:'Moda & Ropa',          bg:'linear-gradient(135deg,#e60012,#990000)', badge:'new',  rating:4.8, url:'https://www.uniqlo.com/us/',                desc:'LifeWear japonesa con HeatTech, AIRism y Ultra Light Down.',                                                 perks:['🧪 HeatTech','🌬️ AIRism','⚡ Calidad','📐 Todas las tallas']},
  {id:'forever21',     name:'Forever 21',            cat:'moda',         catLabel:'Moda & Ropa',          bg:'linear-gradient(135deg,#222,#555)',        badge:'sale', rating:4.2, url:'https://www.forever21.com/',                desc:'Moda juvenil a precios ultra accesibles. Más de 500 estilos nuevos cada semana.',                            perks:['💸 Ultra barato','🌟 Tendencias','👗 +500/sem','🎉 Fiesta y casual']},
  {id:'ralphlauren',   name:'Ralph Lauren',          cat:'moda',         catLabel:'Moda & Ropa',          bg:'linear-gradient(135deg,#002a5e,#004c99)', badge:'hot',  rating:4.9, url:'https://www.ralphlauren.com/',              desc:'El lujo americano. Polo, Purple Label. Elegancia y calidad americana.',                                      perks:['🏆 Lujo premium','🐎 Polo collection','👔 Business & casual','🎁 Gift wrap']},
  {id:'tommy',         name:'Tommy Hilfiger',        cat:'moda',         catLabel:'Moda & Ropa',          bg:'linear-gradient(135deg,#c8102e,#002868)', badge:null,   rating:4.7, url:'https://usa.tommy.com/',                    desc:'Estilo preppy americano. Clásicos reinventados en los colores rojo, blanco y azul.',                         perks:['🇺🇸 Classic style','👕 Casual & formal','💼 Accesorios','🔵 RWB colors']},
  {id:'americaneagle', name:'American Eagle',        cat:'moda',         catLabel:'Moda & Ropa',          bg:'linear-gradient(135deg,#1a3d7c,#2e6fca)', badge:'sale', rating:4.6, url:'https://www.ae.com/',                      desc:'Jeans de alta calidad, ropa casual y línea Aerie. Tallas inclusivas.',                                       perks:['👖 Jeans premium','🌈 Tallas inclusivas','👙 Aerie','🛒 Sales']},
  {id:'oldnavy',       name:'Old Navy',              cat:'moda',         catLabel:'Moda & Ropa',          bg:'linear-gradient(135deg,#003087,#0050c8)', badge:null,   rating:4.4, url:'https://oldnavy.gap.com/',                  desc:'Ropa familiar a precios accesibles. Jeans, básicos y activewear.',                                          perks:['👨‍👩‍👦 Toda familia','💰 Económico','👖 Amplio denim','🏃 Activewear']},
  {id:'shein',         name:'SHEIN',                 cat:'moda',         catLabel:'Moda & Tendencias',    bg:'linear-gradient(135deg,#0a0a14,#1a0a2e)', badge:'hot',  rating:4.3, url:'https://www.shein.com/',                    desc:'La plataforma de moda más grande. Miles de estilos nuevos cada día a precios mínimos.',                      perks:['💸 Precios mínimos','👗 Miles de estilos','📦 +10K novedades/día','🌍 Moda global']},
  {id:'walmart',       name:'Walmart',               cat:'marketplaces', catLabel:'Marketplace',          bg:'linear-gradient(135deg,#0071ce,#004c8c)', badge:'hot',  rating:4.6, url:'https://www.walmart.com/',                  desc:'El retailer más grande del mundo. Electrónica, ropa, hogar a los mejores precios.',                          perks:['🛒 Todo en uno','💰 Precios bajos','📦 Envío rápido','🏷️ Rollback deals']},
  {id:'target',        name:'Target',                cat:'marketplaces', catLabel:'Marketplace',          bg:'linear-gradient(135deg,#cc0000,#8b0000)', badge:'hot',  rating:4.7, url:'https://www.target.com/',                   desc:'El one-stop-shop americano. Moda exclusiva, hogar y marcas propias.',                                        perks:['🎯 Marcas exclusivas','🏠 Hogar & Deco','👗 Moda propia','🧸 Juguetes']},
  {id:'amazon',        name:'Amazon',                cat:'marketplaces', catLabel:'Marketplace',          bg:'linear-gradient(135deg,#131921,#232f3e)', badge:'hot',  rating:4.8, url:'https://www.amazon.com/',                   desc:'El marketplace más grande. Millones de productos con envío rápido a tu casillero.',                           perks:['📦 Millones de productos','⚡ Envío rápido','🔒 Compra segura','🎁 Prime deals']},
  {id:'etsy',          name:'Etsy',                  cat:'marketplaces', catLabel:'Artesanal & Vintage',  bg:'linear-gradient(135deg,#f1641e,#a33e00)', badge:'new',  rating:4.8, url:'https://www.etsy.com/',                     desc:'Productos hechos a mano, vintage y personalizados. Piezas únicas.',                                          perks:['🎨 Hecho a mano','🌟 Piezas únicas','✉️ Personalizable','🛖 Vintage']},
  {id:'tiktokshop',    name:'TikTok Shop',           cat:'marketplaces', catLabel:'Social Commerce',      bg:'linear-gradient(135deg,#010101,#2a0012)', badge:'new',  rating:4.5, url:'https://www.tiktok.com/tiktokshop',         desc:'Los productos virales de TikTok. Descubiertos en tu feed, entregados en tu puerta.',                         perks:['🔥 Productos virales','📱 Tendencias TikTok','⚡ Drops exclusivos','🎁 Deals únicos']},
  {id:'nike',          name:'Nike',                  cat:'calzado',      catLabel:'Calzado & Ropa',       bg:'linear-gradient(135deg,#111,#333)',        badge:'hot',  rating:4.9, url:'https://www.nike.com/',                     desc:'Just Do It. Air Max, Jordan, Dunk. Los sneakers más icónicos del mundo.',                                    perks:['👟 Jordan collection','⚡ Nike Tech','📱 SNKRS App','🏀 Basketball']},
  {id:'newbalance',    name:'New Balance',           cat:'calzado',      catLabel:'Calzado',              bg:'linear-gradient(135deg,#1a1a1a,#4a4a4a)', badge:'hot',  rating:4.8, url:'https://www.newbalance.com/',               desc:'990v6, 530, 2002R. Balance perfecto entre rendimiento y estilo.',                                            perks:['🏆 Made in USA','👟 990/574/2002R','🎨 Custom','⚡ Fresh Foam']},
  {id:'hoka',          name:'HOKA',                  cat:'calzado',      catLabel:'Calzado Running',      bg:'linear-gradient(135deg,#0057B8,#003d82)', badge:'new',  rating:4.8, url:'https://www.hoka.com/',                     desc:'Clifton, Bondi, Speedgoat. Máxima amortiguación, mínimo peso.',                                              perks:['🛸 Max amortiguación','🏃 Running & Trail','⚖️ Ultra ligero','❤️ Pies sensibles']},
  {id:'oncloud',       name:'On Running',            cat:'calzado',      catLabel:'Calzado',              bg:'linear-gradient(135deg,#d0d0d0,#888)',    badge:'new',  rating:4.9, url:'https://www.on-running.com/en-us/',         desc:'CloudTec suiza. Running en nubes. Cloudmonster, Cloudstratus y Cloudnova.',                                  perks:['☁️ CloudTec','🇨🇭 Diseño suizo','🎽 Run & Life','🔋 Ultra durable']},
  {id:'reebok',        name:'Reebok',                cat:'calzado',      catLabel:'Calzado',              bg:'linear-gradient(135deg,#cc0000,#880000)', badge:null,   rating:4.5, url:'https://www.reebok.com/',                   desc:'Club C, Classic Leather. Íconos del streetwear y ediciones limitadas.',                                      perks:['👟 Club C Classic','💪 CrossFit Nano','🎨 Colabs','🔥 Ediciones ltd']},
  {id:'vans',          name:'Vans',                  cat:'calzado',      catLabel:'Calzado Skate',        bg:'linear-gradient(135deg,#e31e24,#1a1a1a)', badge:null,   rating:4.6, url:'https://www.vans.com/',                     desc:'Off the Wall desde 1966. Old Skool, Sk8-Hi, Authentic. Cultura skate global.',                               perks:['🛹 Skate culture','✏️ Custom designs','👟 Old Skool','🤝 Art colabs']},
  {id:'levis',         name:"Levi's",                cat:'calzado',      catLabel:'Denim & Ropa',         bg:'linear-gradient(135deg,#e31e24,#8b0000)', badge:null,   rating:4.7, url:'https://www.levi.com/US/en_US/',            desc:'El jean más icónico desde 1853. 501, 511, 512, 721. Denim americano.',                                       perks:['👖 501 Original','🔵 Denim premium','🌱 WaterLess','👗 Ropa & accesorios']},
  {id:'footlocker',    name:'Foot Locker',           cat:'calzado',      catLabel:'Multi-marca Sneakers', bg:'linear-gradient(135deg,#1a1a1a,#555)',    badge:'hot',  rating:4.6, url:'https://www.footlocker.com/',               desc:'La meca del sneaker. Nike, Jordan, Adidas, New Balance. Lanzamientos exclusivos.',                            perks:['👟 +100 marcas','🔥 Releases','🛍️ Exclusivas','📱 Early access']},
  {id:'sephora',       name:'Sephora',               cat:'belleza',      catLabel:'Belleza Premium',      bg:'linear-gradient(135deg,#1a0025,#3d0058)', badge:'hot',  rating:4.9, url:'https://www.sephora.com/',                  desc:'La meca de la belleza premium. Maquillaje, skincare, fragancias de las mejores marcas.',                      perks:['💄 Marcas premium','✨ Skincare lujo','🌹 Fragancias','🎁 Beauty gifts']},
  {id:'ulta',          name:'Ulta Beauty',           cat:'belleza',      catLabel:'Belleza & Cosméticos', bg:'linear-gradient(135deg,#e91e8c,#9c0b5e)', badge:'hot',  rating:4.8, url:'https://www.ulta.com/',                     desc:'+600 marcas de belleza. Maquillaje, skincare y fragancias para todos los presupuestos.',                      perks:['💄 +600 marcas','✨ Luxury & budget','💆 Salón','🎁 Rewards']},
  {id:'bathandbody',   name:'Bath & Body Works',     cat:'belleza',      catLabel:'Belleza & Cuidado',    bg:'linear-gradient(135deg,#c8006b,#7a003e)', badge:'sale', rating:4.8, url:'https://www.bathandbodyworks.com/',         desc:'Velas 3-wick, lociones y fragancias irresistibles. Colecciones estacionales.',                               perks:['🕯️ Velas 3-Wick','🌸 Colec. estac.','💝 Gift sets','🧴 Lociones premium']},
  {id:'sallybeauty',   name:'Sally Beauty',          cat:'belleza',      catLabel:'Belleza Profesional',  bg:'linear-gradient(135deg,#003366,#0055aa)', badge:null,   rating:4.5, url:'https://www.sallybeauty.com/',              desc:'Productos de belleza profesional para cabello, uñas y piel.',                                               perks:['💅 Uñas pro','💇 Cuidado cabello','🎨 Coloración','🔬 Productos pro']},
  {id:'bluemercury',   name:'Bluemercury',           cat:'belleza',      catLabel:'Skincare de Lujo',     bg:'linear-gradient(135deg,#001a3d,#003380)', badge:'new',  rating:4.8, url:'https://bluemercury.com/',                  desc:'Skincare y spa de lujo. Productos curados de las mejores marcas.',                                           perks:['🌿 Skincare orgánico','💆 Spa products','🌟 Marcas exclusivas','✨ Anti-aging']},
  {id:'mac',           name:'MAC Cosmetics',         cat:'belleza',      catLabel:'Maquillaje Pro',       bg:'linear-gradient(135deg,#1a1a1a,#3a3a3a)', badge:null,   rating:4.7, url:'https://www.maccosmetics.com/',             desc:'Maquillaje profesional favorito de artistas. Ruby Woo, bases y paletas.',                                    perks:['💄 Maquillaje pro','🎨 +100 tonos','🌟 Fav artistas','🖌️ Pro brushes']},
  {id:'apple',         name:'Apple',                 cat:'tech',         catLabel:'Tecnología Premium',   bg:'linear-gradient(135deg,#1c1c1e,#3a3a3c)', badge:'hot',  rating:4.9, url:'https://www.apple.com/',                    desc:'iPhone, MacBook, iPad, Apple Watch, AirPods a precios de USA.',                                              perks:['📱 iPhone','💻 MacBook','⌚ Apple Watch','🎧 AirPods Pro']},
  {id:'bestbuy',       name:'Best Buy',              cat:'tech',         catLabel:'Tecnología',           bg:'linear-gradient(135deg,#003da5,#0056e0)', badge:'hot',  rating:4.6, url:'https://www.bestbuy.com/',                  desc:'La mayor tienda de electrónica. TVs 4K, laptops, gaming y electrodomésticos.',                               perks:['📺 TVs 4K','💻 Laptops & Mac','🎮 Gaming','🔌 Smart Home']},
  {id:'homedepot',     name:'Home Depot',            cat:'hogar',        catLabel:'Hogar & Construcción', bg:'linear-gradient(135deg,#cc5500,#884400)', badge:'hot',  rating:4.7, url:'https://www.homedepot.com/',                desc:'Todo para hogar, jardín y construcción. Herramientas y electrodomésticos.',                                   perks:['🔨 Herramientas','🌿 Jardín','🏠 Construcción','⚡ Electrodomésticos']},
  {id:'ikea',          name:'IKEA',                  cat:'hogar',        catLabel:'Muebles & Hogar',      bg:'linear-gradient(135deg,#003c8f,#0052cc)', badge:'new',  rating:4.6, url:'https://www.ikea.com/us/en/',               desc:'Muebles modernos a precios accesibles. Diseño escandinavo funcional.',                                        perks:['🛋️ Muebles flat-pack','🍽️ Cocina & baño','💡 Iluminación','🌿 Plantas']},
  {id:'wayfair',       name:'Wayfair',               cat:'hogar',        catLabel:'Hogar & Decoración',   bg:'linear-gradient(135deg,#7b2d8b,#4a1a55)', badge:null,   rating:4.5, url:'https://www.wayfair.com/',                  desc:'+14 millones de productos para tu hogar. Muebles, iluminación y decoración.',                                perks:['🛋️ +14M productos','🪑 Muebles','💡 Iluminación','🍳 Electrodomésticos']},
  {id:'lowes',         name:"Lowe's",                cat:'hogar',        catLabel:'Hogar & Mejoras',      bg:'linear-gradient(135deg,#003087,#004db3)', badge:null,   rating:4.6, url:'https://www.lowes.com/',                    desc:'Mejoras para el hogar, herramientas y materiales de construcción.',                                          perks:['🔧 Mejoras hogar','🏗️ Construcción','⚡ Electrodomésticos','🌿 Jardín']},
  {id:'homegoods',     name:'HomeGoods',             cat:'hogar',        catLabel:'Deco & Hogar',         bg:'linear-gradient(135deg,#8b2200,#cc3300)', badge:'sale', rating:4.5, url:'https://www.homegoods.com/',                desc:'Decoración y accesorios para el hogar a precios de outlet. Stock nuevo semanal.',                             perks:['🏠 Deco única','💰 Precio outlet','🔄 Stock semanal','🎨 Estilos variados']}
];

/* ─── PRODUCT & REVIEW DATA (lazy) ─── */
var _dataLoaded = false;
var PRODS = {};
var REVIEWS = {};
var DEFAULT_REVIEWS = [
  {av:'MR',col:'#E31E24',nm:'María R.',loc:'Santo Domingo, RD',st:5,tx:'Excelente servicio. Los productos llegaron perfectos y en el tiempo prometido.',dt:'20 May 2026'},
  {av:'JM',col:'#081B4B',nm:'Juan M.',loc:'Bogotá, Colombia',st:5,tx:'USALINK me permite comprar en tiendas antes imposibles. Proceso muy sencillo.',dt:'12 May 2026'},
  {av:'AP',col:'#10b981',nm:'Andrea P.',loc:'Lima, Perú',st:4,tx:'Muy buena experiencia. El empaque cuidó bien los productos.',dt:'5 May 2026'}
];

function loadStoreData(storeId) {
  /* Minimal product data - loaded only when store opened */
  var d = {
    nike:        [{e:'👟',n:'Air Max 270',p:'$150',s:'~2 lb',d:'El Air Max con mayor volumen de aire.'},{e:'🏀',n:'Jordan 1 Retro',p:'$180',s:'~2 lb',d:'El sneaker más icónico. Edición retro.'},{e:'🏃',n:'Nike React',p:'$160',s:'~1.8 lb',d:'Para running de larga distancia.'},{e:'⚽',n:'Nike Mercurial',p:'$130',s:'~1.5 lb',d:'Botines de fútbol profesionales.'}],
    apple:       [{e:'📱',n:'iPhone 16 Pro',p:'$999',s:'~0.5 lb',d:'Chip A18 Pro. Cámara 48MP.'},{e:'💻',n:'MacBook Air M3',p:'$1,099',s:'~3 lb',d:'Chip M3. 18h batería.'},{e:'🎧',n:'AirPods Pro 2',p:'$249',s:'~0.3 lb',d:'Cancelación de ruido USB-C.'},{e:'⌚',n:'Apple Watch S10',p:'$399',s:'~0.4 lb',d:'ECG y detección de caídas.'}],
    zara:        [{e:'👗',n:'Blazer',p:'$69',s:'~1 lb',d:'Blazer structured fit.'},{e:'👖',n:'Straight Jeans',p:'$45',s:'~1.2 lb',d:'El corte más popular.'},{e:'👟',n:'Platform Shoes',p:'$55',s:'~1.5 lb',d:'Tendencia del momento.'},{e:'🧥',n:'Trench Coat',p:'$99',s:'~1.8 lb',d:'Estilo atemporal.'}],
    amazon:      [{e:'📦',n:'Amazon Basics',p:'$45',s:'~1 lb',d:'Kit de cables esenciales.'},{e:'🔊',n:'Echo Dot 5th',p:'$50',s:'~0.8 lb',d:'Alexa en tu casa.'},{e:'📖',n:'Kindle Paperwhite',p:'$140',s:'~0.5 lb',d:'Batería de semanas.'},{e:'🔑',n:'Smart Plug',p:'$25',s:'~0.3 lb',d:'Control desde tu teléfono.'}],
    walmart:     [{e:'📺',n:'TCL 55 4K TV',p:'$298',s:'~18 lb',d:'Smart TV 4K con Roku.'},{e:'🎮',n:'PS5 Bundle',p:'$499',s:'~8 lb',d:'PlayStation 5 con juego.'},{e:'🍳',n:'Instant Pot',p:'$79',s:'~6 lb',d:'Olla multicocina más vendida.'},{e:'📱',n:'Apple Watch SE',p:'$249',s:'~0.5 lb',d:'GPS y monitoreo de salud.'}],
    target:      [{e:'🎯',n:'Gift Card',p:'$50',s:'~0.1 lb',d:'Válida en toda la tienda.'},{e:'🧸',n:'Cat & Jack Set',p:'$35',s:'~1 lb',d:'Ropa exclusiva para niños.'},{e:'🏠',n:'Threshold Decor',p:'$45',s:'~2.5 lb',d:'Decoración premium Target.'},{e:'🍽️',n:'Made By Design',p:'$38',s:'~3 lb',d:'Set de cocina premium.'}],
    sephora:     [{e:'💄',n:'Charlotte Tilbury',p:'$35',s:'~0.3 lb',d:'Labial viral Pillow Talk.'},{e:'✨',n:'Rare Beauty Blush',p:'$24',s:'~0.3 lb',d:'Blush de Selena Gomez.'},{e:'🌿',n:'Drunk Elephant',p:'$90',s:'~0.5 lb',d:'Serum C-Firma.'},{e:'🌸',n:'Sol de Janeiro',p:'$58',s:'~1.2 lb',d:'Body set más viral.'}],
    ulta:        [{e:'💄',n:'MAC Ruby Woo',p:'$22',s:'~0.2 lb',d:'El labial rojo más famoso.'},{e:'💅',n:'OPI Bundle',p:'$35',s:'~0.8 lb',d:'Esmaltes más duraderos.'},{e:'🧴',n:'CeraVe Kit',p:'$28',s:'~1 lb',d:'Recomendado por dermatólogos.'},{e:'🌺',n:'OUAI Hair Set',p:'$52',s:'~1.5 lb',d:'Cabello de comercial.'}],
    bathandbody: [{e:'🕯️',n:'3-Wick Candle',p:'$16',s:'~1.2 lb',d:'45 horas de fragancia.'},{e:'🧴',n:'Body Lotion x2',p:'$22',s:'~1.5 lb',d:'Pack bestseller.'},{e:'🛁',n:'Ultimate Gift Set',p:'$45',s:'~2.5 lb',d:'Set completo regalo.'},{e:'🌸',n:'Fragrance Mist',p:'$18',s:'~0.5 lb',d:'Fragancia todo el día.'}],
    bestbuy:     [{e:'📺',n:'Samsung 65 QLED',p:'$799',s:'~25 lb',d:'TV QLED 4K Quantum HDR.'},{e:'🎮',n:'Xbox Series X',p:'$499',s:'~7 lb',d:'Consola más potente.'},{e:'💻',n:'Dell XPS 15',p:'$1,299',s:'~5 lb',d:'OLED display Intel i7.'},{e:'🔊',n:'Sonos Era 100',p:'$249',s:'~2 lb',d:'Altavoz WiFi premium.'}],
    etsy:        [{e:'🎨',n:'Custom Necklace',p:'$35',s:'~0.2 lb',d:'Collar con tu nombre.'},{e:'🖼️',n:'Custom Portrait',p:'$55',s:'~0.1 lb',d:'Retrato de tu mascota.'},{e:'🕯️',n:'Handmade Candles',p:'$28',s:'~1.5 lb',d:'Velas artesanales.'},{e:'💍',n:'Vintage Ring',p:'$65',s:'~0.1 lb',d:'Pieza única irrepetible.'}],
    tiktokshop:  [{e:'🔥',n:'Viral Makeup Set',p:'$22',s:'~0.8 lb',d:'+5M vendidos en TikTok.'},{e:'💪',n:'Fitness Bands',p:'$18',s:'~0.5 lb',d:'Arrasan en FitTok.'},{e:'🌿',n:'Skincare Serum',p:'$32',s:'~0.4 lb',d:'Viral en SkinTok.'},{e:'🎧',n:'LED Earbuds',p:'$25',s:'~0.4 lb',d:'Virales con luces LED.'}]
  };
  var r = {
    nike:    [{av:'CM',col:'#E31E24',nm:'Carlos M.',loc:'Santo Domingo',st:5,tx:'Jordan 4 en 5 días. Perfecto.',dt:'May 2026'},{av:'LR',col:'#081B4B',nm:'Laura R.',loc:'Bogotá',st:5,tx:'Air Max a mitad de precio local.',dt:'Abr 2026'}],
    apple:   [{av:'AR',col:'#1c1c1e',nm:'Ana R.',loc:'Santiago',st:5,tx:'MacBook Air sellado. Ahorré $400.',dt:'May 2026'},{av:'MG',col:'#E31E24',nm:'Miguel G.',loc:'Caracas',st:5,tx:'iPhone 16 Pro en 4 días.',dt:'May 2026'}],
    sephora: [{av:'MC',col:'#3d0058',nm:'María C.',loc:'Bogotá',st:5,tx:'Productos 100% auténticos.',dt:'May 2026'},{av:'NR',col:'#10b981',nm:'Natalia R.',loc:'Santo Domingo',st:5,tx:'Drunk Elephant que tanto quería.',dt:'May 2026'}],
    amazon:  [{av:'BM',col:'#131921',nm:'Bruce M.',loc:'Santo Domingo',st:5,tx:'Kindle y Echo juntos. Ahorré en envío.',dt:'May 2026'},{av:'EM',col:'#E31E24',nm:'Elena M.',loc:'Caracas',st:5,tx:'Amazon más USALINK, combinación perfecta.',dt:'May 2026'}],
    walmart: [{av:'MR',col:'#0071ce',nm:'Manuel R.',loc:'Guatemala',st:5,tx:'TV y Instant Pot consolidados.',dt:'May 2026'},{av:'HR',col:'#10b981',nm:'Hugo R.',loc:'Santo Domingo',st:5,tx:'3 paquetes en uno. Ahorro notable.',dt:'May 2026'}]
  };
  return {
    prods:   d[storeId] || [{e:'🛍️',n:'Ver en tienda',p:'Ver precios',s:'Variable',d:'Visita la tienda para ver el catálogo completo.'},{e:'🔗',n:'Catálogo completo',p:'Desde $10',s:'Variable',d:'Miles de productos disponibles.'},{e:'⭐',n:'Productos destacados',p:'Mejores precios',s:'Variable',d:'Los más vendidos de la temporada.'},{e:'💰',n:'Ofertas del día',p:'Hasta 60% off',s:'Variable',d:'Descuentos especiales solo hoy.'}],
    reviews: r[storeId] || DEFAULT_REVIEWS
  };
}

/* ─── CAT META ─── */
var CAT_META = [
  {key:'outlets',      icon:'🛍️', label:'Outlets'},
  {key:'moda',         icon:'👗',  label:'Moda & Ropa'},
  {key:'marketplaces', icon:'🏬',  label:'Marketplaces'},
  {key:'calzado',      icon:'👟',  label:'Calzado'},
  {key:'belleza',      icon:'💄',  label:'Belleza'},
  {key:'tech',         icon:'📱',  label:'Tech'},
  {key:'hogar',        icon:'🏠',  label:'Hogar'}
];

/* ─── HELPERS ─── */
function starsHtml(n){
  var s = ''; for(var i=0;i<5;i++) s += i<n?'★':'☆'; return s;
}
function badgeHtml(b, cls){
  if(!b) return '';
  var map={hot:'🔥 Popular',new:'✨ Nuevo',sale:'💸 Oferta'};
  return '<span class="'+cls+' '+b+'">'+map[b]+'</span>';
}

/* ─── STORE FILTER ─── */
function getFiltered(){
  var q = (document.getElementById('storeSearch')||{value:''}).value.trim().toLowerCase();
  return STORES.filter(function(s){
    var catOk = storeCat==='all' || s.cat===storeCat;
    var qOk   = !q || s.name.toLowerCase().indexOf(q)>=0 || s.catLabel.toLowerCase().indexOf(q)>=0;
    return catOk && qOk;
  });
}

function setStoreCat(el, cat){
  document.querySelectorAll('#storeChips .chip').forEach(function(c){ c.classList.remove('on'); });
  el.classList.add('on');
  storeCat = cat;
  renderStores();
  document.getElementById('page-stores').scrollTop = 0;
}

function goStoresCat(cat){
  goPage('page-stores');
  var btn = document.querySelector('#storeChips .chip[data-cat="'+cat+'"]');
  if(btn) setStoreCat(btn, cat);
}

var storeSearchTimer;
function initStoreSearch(){
  var inp = document.getElementById('storeSearch');
  var x   = document.getElementById('storeSearchX');
  if(!inp) return;
  inp.addEventListener('input', function(){
    if(x) x.classList.toggle('show', inp.value.length>0);
    clearTimeout(storeSearchTimer);
    storeSearchTimer = setTimeout(renderStores, 200);
  });
}
function clearStoreSearch(){
  var inp = document.getElementById('storeSearch');
  var x   = document.getElementById('storeSearchX');
  if(inp) inp.value='';
  if(x) x.classList.remove('show');
  renderStores();
}

/* ─── VIEW TOGGLE ─── */
function setStoreView(v){
  storeView = v;
  document.getElementById('sv-appstore').style.display  = v==='appstore'  ? 'block':'none';
  document.getElementById('sv-instagram').style.display = v==='instagram' ? 'block':'none';
  document.getElementById('btnAS').classList.toggle('on', v==='appstore');
  document.getElementById('btnIG').classList.toggle('on', v==='instagram');
  renderStores();
  document.getElementById('page-stores').scrollTop = 0;
}

/* ─── RENDER STORES ─── */
function renderStores(){
  var list = getFiltered();
  var el = document.getElementById('storeCount');
  if(el) el.textContent = list.length;
  var nr = document.getElementById('storeNoRes');
  if(nr) nr.style.display = list.length ? 'none':'block';
  if(storeView==='appstore') renderAS(list);
  else renderIG(list);
}

function renderAS(list){
  var hero = null;
  var preferred = ['saksoff5th','nike','apple','sephora','nordstromrack','amazon'];
  for(var i=0;i<preferred.length;i++){
    var found = list.find(function(s){ return s.id===preferred[i]; });
    if(found){ hero=found; break; }
  }
  if(!hero && list.length) hero=list[0];

  var html = '';
  if(hero){
    html += '<div class="as-hero" onclick="openStorePage(''+hero.id+'')">'+
      '<div class="as-hero-bg" style="background:'+hero.bg+'"></div>'+
      '<div class="as-hero-ov"></div>'+
      '<div class="as-hero-ct">'+
        '<div class="as-hero-top">'+
          '<div class="as-hero-htag"><span class="live-dot"></span> Destacada</div>'+
          '<div class="as-hero-name">'+hero.name+'</div>'+
          '<div class="as-hero-sub">'+hero.catLabel+'</div>'+
        '</div>'+
        '<div class="as-hero-bot">'+
          '<div class="as-hero-cta">🔗 Ver tienda</div>'+
          '<div class="as-hero-rating">★ '+hero.rating+'</div>'+
        '</div>'+
      '</div>'+
    '</div>';
  }

  var catsToShow = storeCat==='all' ? CAT_META : CAT_META.filter(function(c){ return c.key===storeCat; });

  catsToShow.forEach(function(c){
    var cl = list.filter(function(s){ return s.cat===c.key; });
    if(!cl.length) return;

    html += '<div class="as-row">'+
      '<div class="as-row-head">'+
        '<div class="as-row-title">'+c.icon+' '+c.label+'</div>'+
        '<span class="as-row-ct">'+cl.length+' tiendas</span>'+
      '</div>'+
      '<div class="h-scroll">';

    cl.forEach(function(s){
      var bdg = s.badge ? '<span class="mc-badge mb-'+s.badge+'">'+(s.badge==='hot'?'Popular':s.badge==='new'?'Nuevo':'Oferta')+'</span>' : '<span></span>';
      html += '<div class="mc" onclick="openStorePage(''+s.id+'')">'+
        '<div class="mc-banner">'+
          '<div class="mc-bg" style="background:'+s.bg+'"></div>'+
          '<div class="mc-ov"></div>'+
          '<div class="mc-name">'+s.name+'</div>'+
        '</div>'+
        '<div class="mc-body">'+
          '<div class="mc-sname">'+s.name+'</div>'+
          '<div class="mc-cat">'+s.catLabel+'</div>'+
          '<div class="mc-foot">'+bdg+'<span class="mc-fav" onclick="toggleFav(event,''+s.id+'')">'+favIcon(s.id)+'</span></div>'+
        '</div>'+
      '</div>';
    });

    html += '</div></div>';
  });

  html += '<div class="s-promo">'+
    '<div class="sp-tag">Compras asistidas</div>'+
    '<div class="sp-title">Sin tarjeta USA?</div>'+
    '<div class="sp-sub">Compramos por ti. Solo envíanos el link del producto.</div>'+
    '<button class="sp-btn" onclick="goPage('page-account')">Solicitar compra</button>'+
  '</div>';

  document.getElementById('as-content').innerHTML = html;
}

function renderIG(list){
  var catsToShow = storeCat==='all' ? CAT_META : CAT_META.filter(function(c){ return c.key===storeCat; });
  var html = '';
  var bdgMap = {hot:'🔥',new:'✨',sale:'💸'};

  catsToShow.forEach(function(c){
    var cl = list.filter(function(s){ return s.cat===c.key; });
    if(!cl.length) return;
    html += '<div class="ig-sec-lbl">'+c.icon+' '+c.label+' <span style="font-size:12px;color:var(--g400)">'+cl.length+'</span></div>';
    html += '<div class="ig-grid">';
    cl.forEach(function(s,i){
      var big = i===0;
      var bdg = s.badge ? '<div class="ig-bdg '+s.badge+'">'+bdgMap[s.badge]+'</div>' : '';
      html += '<div class="ig-item'+(big?' big':'')+'" onclick="openStorePage(''+s.id+'')">'+
        '<div class="ig-bg" style="background:'+s.bg+'"></div>'+
        '<div class="ig-ov"></div>'+bdg+
        '<button class="ig-fav" onclick="toggleFav(event,''+s.id+'')">'+favIcon(s.id)+'</button>'+
        '<div class="ig-logo"><div class="ig-name">'+s.name+'</div><div class="ig-subcat">'+s.catLabel+'</div></div>'+
      '</div>';
    });
    html += '</div>';
  });

  document.getElementById('ig-content').innerHTML = html;
}

/* ─── STORE DETAIL PAGE ─── */
function openStorePage(id){
  var s = STORES.find(function(st){ return st.id===id; });
  if(!s) return;
  var loaded  = loadStoreData(id);
  var prods   = loaded.prods;
  var reviews = loaded.reviews;

  var bdg = s.badge ? '<span class="sd-badge-hero '+s.badge+'">'+(s.badge==='hot'?'🔥 Popular':s.badge==='new'?'✨ Nuevo':'💸 Oferta')+'</span>' : '';

  /* Perks */
  var perksHtml = '';
  s.perks.forEach(function(p){
    var parts = p.split(' ');
    perksHtml += '<div class="sd-perk"><span>'+parts[0]+'</span>'+parts.slice(1).join(' ')+'</div>';
  });

  /* Products */
  var prodsHtml = '';
  prods.forEach(function(p, idx){
    prodsHtml += '<div class="sd-prod" onclick="openProd(''+id+'','+idx+')">'+
      '<div class="sd-prod-img">'+
        '<div class="sd-prod-img-bg" style="background:'+s.bg+'"></div>'+
        p.e+
      '</div>'+
      '<div class="sd-prod-body">'+
        '<div class="sd-prod-name">'+p.n+'</div>'+
        '<div class="sd-prod-price">'+p.p+'</div>'+
        '<div class="sd-prod-ship">✈ ~'+p.s+'</div>'+
        '<div class="sd-prod-btn">🛒 Ver producto</div>'+
      '</div>'+
    '</div>';
  });

  /* Rating bars */
  var pct5 = Math.round((s.rating-3.5)*55+45);
  var pct4 = Math.round((s.rating-3.5)*20+18);
  var barsHtml =
    '<div class="sd-bar-row"><span class="sd-bar-lbl">5</span><div class="sd-bar-track"><div class="sd-bar-fill" style="width:'+pct5+'%"></div></div><span class="sd-bar-pct">'+pct5+'%</span></div>'+
    '<div class="sd-bar-row"><span class="sd-bar-lbl">4</span><div class="sd-bar-track"><div class="sd-bar-fill" style="width:'+pct4+'%;background:var(--green)"></div></div><span class="sd-bar-pct">'+pct4+'%</span></div>'+
    '<div class="sd-bar-row"><span class="sd-bar-lbl">3</span><div class="sd-bar-track"><div class="sd-bar-fill" style="width:8%;background:var(--g300)"></div></div><span class="sd-bar-pct">8%</span></div>'+
    '<div class="sd-bar-row"><span class="sd-bar-lbl">2</span><div class="sd-bar-track"><div class="sd-bar-fill" style="width:4%;background:var(--g300)"></div></div><span class="sd-bar-pct">4%</span></div>'+
    '<div class="sd-bar-row"><span class="sd-bar-lbl">1</span><div class="sd-bar-track"><div class="sd-bar-fill" style="width:2%;background:#ffcdd2"></div></div><span class="sd-bar-pct">2%</span></div>';

  /* Reviews */
  var reviewsHtml = '';
  reviews.forEach(function(r){
    var stars = '';
    for(var i=0;i<r.st;i++) stars+='★';
    reviewsHtml += '<div class="sd-review">'+
      '<div class="sd-review-header">'+
        '<div class="sd-review-author">'+
          '<div class="sd-review-avatar" style="background:'+r.col+'">'+r.av+'</div>'+
          '<div><div class="sd-review-name">'+r.nm+'</div><div class="sd-review-location">📍 '+r.loc+'</div></div>'+
        '</div>'+
        '<div class="sd-review-stars">'+stars+'</div>'+
      '</div>'+
      '<div class="sd-review-text">'+r.tx+'</div>'+
      '<div class="sd-review-date">'+r.dt+' · Compra verificada ✓</div>'+
    '</div>';
  });

  var html =
    '<div class="sd-hero">'+
      '<div class="sd-hero-bg" style="background:'+s.bg+'"></div>'+
      '<div class="sd-hero-ov"></div>'+
      '<button class="sd-back" onclick="goBack()">‹</button>'+
      '<div class="sd-hero-info">'+
        '<div class="sd-store-name">'+s.name+'</div>'+
        '<div class="sd-store-cat">'+s.catLabel+'</div>'+
        '<div class="sd-rating-row">'+
          '<span class="sd-stars">★★★★★</span>'+
          '<span class="sd-rating-num">'+s.rating+'</span>'+bdg+
        '</div>'+
      '</div>'+
    '</div>'+

    '<div class="sd-actions">'+
      '<a class="sd-btn sd-btn-primary" href="'+s.url+'" target="_blank">🔗 Ir a la tienda</a>'+
      '<button class="sd-btn sd-btn-red" onclick="goPage('page-account')">🤝 Compra asistida</button>'+
    '</div>'+
    '<div style="padding:10px 16px 0">'+
      '<button onclick="openStoreAI(''+s.name+'')" style="width:100%;padding:12px;border-radius:var(--r-lg);background:linear-gradient(135deg,var(--navy),#0a2070);color:#fff;font-size:13px;font-weight:800;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">'+
        '🤖 Preguntar a Aphrodite AI sobre '+s.name+
      '</button>'+
    '</div>'+

    '<div class="sd-info-strip">'+
      '<div class="sd-info-item"><div class="sd-info-icon">✈</div><div class="sd-info-lbl">Envío desde</div><div class="sd-info-val green">$8.50/lb</div></div>'+
      '<div class="sd-info-item"><div class="sd-info-icon">⏱</div><div class="sd-info-lbl">Entrega</div><div class="sd-info-val">3–7 días</div></div>'+
      '<div class="sd-info-item"><div class="sd-info-icon">🛡️</div><div class="sd-info-lbl">Seguro</div><div class="sd-info-val green">Incluido</div></div>'+
      '<div class="sd-info-item"><div class="sd-info-icon">⭐</div><div class="sd-info-lbl">Rating</div><div class="sd-info-val">'+s.rating+'</div></div>'+
    '</div>'+

    '<div class="sd-desc-block">'+
      '<div class="sd-desc-title">Sobre '+s.name+'</div>'+
      '<div class="sd-desc-text">'+s.desc+'</div>'+
    '</div>'+

    '<div class="sd-perks">'+perksHtml+'</div>'+

    '<div class="sd-rating-block">'+
      '<div class="sd-rating-title" style="font-size:13px;font-weight:800;color:var(--navy);margin-bottom:12px">⭐ Calificaciones y reseñas</div>'+
      '<div class="sd-rating-big">'+
        '<div class="sd-rating-score">'+s.rating+'</div>'+
        '<div class="sd-rating-detail">'+
          '<div class="sd-rating-stars-big">★★★★★</div>'+
          '<div class="sd-rating-count">Basado en +2,400 reseñas verificadas</div>'+
        '</div>'+
      '</div>'+
      '<div class="sd-bars">'+barsHtml+'</div>'+
    '</div>'+

    '<div class="sd-sec"><div class="sd-sec-title">💬 Reseñas recientes</div></div>'+
    '<div class="sd-reviews">'+reviewsHtml+'</div>'+

    '<div class="sd-sec"><div class="sd-sec-title">🔥 Productos destacados</div><span class="sd-sec-more">'+prods.length+' items</span></div>'+
    '<div class="sd-products-scroll">'+prodsHtml+'</div>'+

    '<div class="sd-ship-calc">'+
      '<div class="sd-sc-title">Calcula tu envío</div>'+
      '<div class="sd-sc-sub">Ingresa el peso y destino para cotizar</div>'+
      '<div class="sd-sc-row">'+
        '<input type="number" class="sd-sc-input" id="sdWeight" placeholder="Peso (lbs)" min="0" step="0.1">'+
        '<select class="sd-sc-select" id="sdCountry">'+
          '<option value="">País...</option>'+
          '<option value="8.50">🇩🇴 Rep. Dom.</option>'+
          '<option value="9.00">🇲🇽 México</option>'+
          '<option value="9.50">🇨🇴 Colombia</option>'+
          '<option value="10.00">🇻🇪 Venezuela</option>'+
          '<option value="10.50">🇵🇪 Perú</option>'+
          '<option value="11.00">🇨🇱 Chile</option>'+
          '<option value="11.50">🇦🇷 Argentina</option>'+
          '<option value="12.00">🇧🇷 Brasil</option>'+
        '</select>'+
      '</div>'+
      '<button class="sd-sc-btn" onclick="doStoreCalc()">📦 Calcular envío</button>'+
      '<div class="sd-sc-result" id="sdCalcResult">'+
        '<div class="sd-sc-res-row"><span>Tarifa base</span><span id="sdBase">—</span></div>'+
        '<div class="sd-sc-res-row"><span>Manejo y seguro</span><span>$3.00</span></div>'+
        '<div class="sd-sc-res-row"><span>💰 Total estimado</span><span id="sdTotal">—</span></div>'+
      '</div>'+
    '</div>'+
    '<div style="height:8px"></div>';

  document.getElementById('store-detail-content').innerHTML = html;
  goPage('page-store-detail');
}

function goBack(){ goPage('page-stores'); }

function doStoreCalc(){
  var w    = parseFloat((document.getElementById('sdWeight')||{value:0}).value) || 0;
  var rate = parseFloat((document.getElementById('sdCountry')||{value:0}).value) || 0;
  if(!w||!rate){ alert('Ingresa el peso y selecciona el país'); return; }
  var base=w*rate, total=base+3;
  var b=document.getElementById('sdBase'), t=document.getElementById('sdTotal');
  if(b) b.textContent='$'+base.toFixed(2);
  if(t) t.textContent='$'+total.toFixed(2);
  var res=document.getElementById('sdCalcResult');
  if(res) res.classList.add('show');
}

/* ─── PRODUCT DETAIL SHEET ─── */
function openProd(storeId, idx){
  var loaded = loadStoreData(storeId);
  var prods = loaded.prods;
  var store = STORES.find(function(s){ return s.id===storeId; });
  if(!prods||!store) return;
  var p = prods[idx];
  if(!p) return;
  document.getElementById('pdEmoji').textContent  = p.e;
  document.getElementById('pdName').textContent   = p.n;
  document.getElementById('pdStore').textContent  = store.name;
  document.getElementById('pdPrice').textContent  = p.p;
  document.getElementById('pdShip').textContent   = '✈ Peso aprox: '+p.s+' · Envío desde $8.50/lb';
  document.getElementById('pdDesc').textContent   = p.d;
  document.getElementById('pdBtnStore').href      = store.url;
  document.getElementById('pdOverlay').classList.add('open');
  document.getElementById('pdSheet').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closePd(){
  document.getElementById('pdOverlay').classList.remove('open');
  document.getElementById('pdSheet').classList.remove('open');
  document.body.style.overflow = '';
}
function closePdBg(e){ if(e.target.id==='pdOverlay') closePd(); }
var _psy=0;
document.getElementById('pdSheet').addEventListener('touchstart',function(e){_psy=e.touches[0].clientY;},{passive:true});
document.getElementById('pdSheet').addEventListener('touchmove',function(e){if(e.touches[0].clientY-_psy>70)closePd();},{passive:true});

/* ─── TRACKING ─── */
document.getElementById('trackInput').addEventListener('keydown',function(e){ if(e.key==='Enter') doTrack(); });
function doTrack(){
  var v=(document.getElementById('trackInput')||{value:''}).value.trim();
  if(!v||v.length<3){
    var inp=document.getElementById('trackInput');
    if(inp){inp.style.borderColor='rgba(227,30,36,.6)';setTimeout(function(){inp.style.borderColor='';},2000);}
    return;
  }
  var idEl=document.getElementById('trackId');
  if(idEl) idEl.textContent=v.toUpperCase();
  var res=document.getElementById('trackResult');
  if(res){ res.classList.add('show'); setTimeout(function(){res.scrollIntoView({behavior:'smooth',block:'nearest'});},100); }
}

/* ─── CALCULATOR ─── */
function doCalc(){
  var w=parseFloat((document.getElementById('cWeight')||{value:0}).value)||0;
  var l=parseFloat((document.getElementById('cLen')||{value:0}).value)||0;
  var wi=parseFloat((document.getElementById('cWid')||{value:0}).value)||0;
  var h=parseFloat((document.getElementById('cHgt')||{value:0}).value)||0;
  var rateEl=document.getElementById('cCountry');
  var rate=parseFloat(rateEl?rateEl.value:0)||0;
  if((!w&&!(l&&wi&&h))||!rate){alert('Completa todos los campos');return;}
  var vol=(l*wi*h)/139, bill=Math.max(w,vol), base=bill*rate, total=base+3;
  var b=document.getElementById('crBillable'),r=document.getElementById('crBase'),t=document.getElementById('crTotal');
  if(b) b.textContent=bill.toFixed(2)+' lbs';
  if(r) r.textContent='$'+base.toFixed(2);
  if(t) t.textContent='$'+total.toFixed(2);
  var res=document.getElementById('calcRes');
  if(res){res.classList.add('show');setTimeout(function(){res.scrollIntoView({behavior:'smooth',block:'nearest'});},100);}
}

/* ─── COPY ADDRESS ─── */
function copyAddress(){
  var addr='Bruce Ramírez — USL-00423\n3250 NW 107th Ave Suite 500\nDoral, FL 33172\nUnited States';
  if(navigator.clipboard) navigator.clipboard.writeText(addr).then(function(){alert('✅ Dirección copiada!');});
  else alert('✅ '+addr);
}

/* ─── HERO VIDEO SLIDER ─── */
var heroIdx=0, HERO_TOTAL=7, heroTimer=null, heroTouchX=0, globalMuted=true;

function updateHero(){
  var track=document.getElementById('hsTrack');
  if(track) track.style.transform='translateX(-'+(heroIdx*100)+'%)';
  document.querySelectorAll('.hs-dot').forEach(function(d,i){ d.classList.toggle('on',i===heroIdx); });
  var bar=document.getElementById('hsProgress');
  if(bar){
    bar.classList.remove('anim'); bar.style.width='0%';
    void bar.offsetWidth;
    bar.classList.add('anim'); bar.style.width='100%';
  }
  /* play/pause mp4 videos */
  document.querySelectorAll('.hs-vid').forEach(function(v){ try{v.pause();}catch(e){} });
  var slides=document.querySelectorAll('.hs-slide');
  if(slides[heroIdx]){
    var v=slides[heroIdx].querySelector('.hs-vid');
    if(v){ v.muted=globalMuted; try{v.play();}catch(e){} }
  }
}
function slideHero(dir){ heroIdx=(heroIdx+dir+HERO_TOTAL)%HERO_TOTAL; updateHero(); resetHeroTimer(); }
function goHeroSlide(i){ heroIdx=i; updateHero(); resetHeroTimer(); }
function resetHeroTimer(){
  clearInterval(heroTimer);
  heroTimer=setInterval(function(){ heroIdx=(heroIdx+1)%HERO_TOTAL; updateHero(); },5000);
}
function toggleMute(){
  globalMuted=!globalMuted;
  var btn=document.getElementById('hsMute');
  if(btn) btn.textContent=globalMuted?'🔇':'🔊';
  document.querySelectorAll('.hs-vid').forEach(function(v){ v.muted=globalMuted; });
}
var sliderEl=document.getElementById('heroSlider');
if(sliderEl){
  sliderEl.addEventListener('touchstart',function(e){ heroTouchX=e.touches[0].clientX; },{passive:true});
  sliderEl.addEventListener('touchend',function(e){
    var dx=e.changedTouches[0].clientX-heroTouchX;
    if(Math.abs(dx)>40) slideHero(dx<0?1:-1);
  },{passive:true});
}
document.querySelectorAll('.hs-dot').forEach(function(d,i){ d.addEventListener('click',function(){ goHeroSlide(i); }); });

/* ═══════════════════════════════════════════
   APHRODITE AI — LOGIC
═══════════════════════════════════════════ */
var aiMode = 'shop';
var aiHistory = [];
var aiFloatHistory = [];
var aiThinking = false;

var AI_SYSTEM = {
  shop:    'Eres Aphrodite, asistente de compras de USALINK. Ayudas a usuarios de Latinoamérica a encontrar productos en tiendas USA (Nike, Apple, Zara, Amazon, Sephora, etc). Sugieres tiendas, productos y categorías. Eres amigable, concisa y útil. Responde siempre en español. Máximo 3 párrafos cortos.',
  support: 'Eres Aphrodite, agente de soporte de USALINK. Respondes preguntas sobre envíos a Latinoamérica, tiempos de entrega (3-7 días), tarifas ($8.50/lb desde Miami), consolidación, rastreo y casillero en Miami. Sé precisa y tranquilizadora. Responde en español. Máximo 3 párrafos.',
  quote:   'Eres Aphrodite, cotizadora de USALINK. Cuando el usuario te da el peso o dimensiones de un paquete y su país, calcula el costo: peso volumétrico = L×W×H÷139, cobra el mayor entre real y volumétrico, tarifa RD $8.50/lb, México $9.00, Colombia $9.50, Venezuela $10.00, Perú $10.50, Chile $11.00, Argentina $11.50, Brasil $12.00. Suma $3 de manejo. Muestra el desglose. Responde en español.',
  agent:   'Eres Aphrodite, agente proactivo de USALINK. Puedes hacer cotizaciones, recomendar tiendas, explicar el proceso de compras asistidas, calcular ahorros vs precios locales, y sugerir qué consolidar. Sé proactiva y ofrece opciones concretas. Responde en español. Máximo 4 párrafos.'
};

var AI_SUGGESTIONS = {
  shop:    ['¿Qué tiendas tienen mejores ofertas?','Recomiéndame sneakers baratos','¿Dónde compro tech en USA?','Mejores outlets de ropa','¿Qué hay en TikTok Shop?'],
  support: ['¿Cuánto tarda mi paquete?','¿Cómo funciona la consolidación?','¿Puedo rastrear mi pedido?','¿Qué pasa si llega dañado?','¿Cómo obtengo mi dirección?'],
  quote:   ['Cotizar 2 lbs a Rep. Dom.','Cotizar caja 10x8x6 a Colombia','¿Cuánto cuesta enviar una TV?','Cotizar zapatos a México','Calcular envío de laptop'],
  agent:   ['Quiero comprar un iPhone','Ayúdame a consolidar mis pedidos','¿Cuánto ahorro vs precios locales?','Hazme un plan de compras','Qué conviene más consolidar']
};

var AI_WELCOME = {
  shop:    '¡Hola! Soy Aphrodite 🛍️ Tu asistente de compras. ¿Buscas algo en especial en las tiendas USA? Cuéntame y te ayudo a encontrarlo.',
  support: '¡Hola! Estoy aquí para ayudarte 💬 Puedo resolver tus dudas sobre envíos, tarifas, rastreo y todo lo que necesites saber de USALINK.',
  quote:   '¡Hola! Cotizadora lista 📦 Dame el peso y destino de tu paquete y te doy el precio exacto al instante. También puedo calcular peso volumétrico.',
  agent:   '¡Hola! Soy tu agente proactivo ⚡ Dime qué quieres comprar, cuánto quieres gastar, o qué tienes en tu casillero — te ayudo a optimizar todo.'
};

function setAiMode(mode) {
  aiMode = mode;
  document.querySelectorAll('.ai-mode-btn').forEach(function(b){ b.classList.remove('active'); });
  var btn = document.getElementById('aibtn-' + mode);
  if (btn) btn.classList.add('active');
  /* Update welcome message */
  var wt = document.getElementById('aiWelcomeTxt');
  if (wt) wt.textContent = AI_WELCOME[mode];
  /* Update suggestions */
  renderAiSuggestions();
  /* Clear chat except welcome */
  var chat = document.getElementById('aiChat');
  if (chat) {
    var msgs = chat.querySelectorAll('.ai-msg:not(:first-child)');
    msgs.forEach(function(m){ m.remove(); });
  }
  aiHistory = [];
}

function renderAiSuggestions() {
  var el = document.getElementById('aiSuggestions');
  if (!el) return;
  var chips = AI_SUGGESTIONS[aiMode] || [];
  el.innerHTML = chips.map(function(s){
    return '<button class="ai-sugg-chip" onclick="useAiSugg(this.textContent)">' + s + '</button>';
  }).join('');
}

function toggleAiSuggestions() {
  var el = document.getElementById('aiSuggestions');
  if (!el) return;
  el.style.display = el.style.display === 'none' ? 'flex' : 'none';
}

function useAiSugg(text) {
  var inp = document.getElementById('aiInput');
  if (inp) { inp.value = text; sendAiMsg(); }
}

function addAiMsg(text, isUser, targetChat) {
  var chat = document.getElementById(targetChat || 'aiChat');
  if (!chat) return;
  var div = document.createElement('div');
  div.className = 'ai-msg ' + (isUser ? 'ai-msg-user' : 'ai-msg-bot');
  div.innerHTML = (isUser ? '' : '<div class="ai-msg-avatar">🤖</div>') +
    '<div class="ai-msg-bubble">' + text + '</div>' +
    (isUser ? '<div class="ai-msg-avatar" style="background:linear-gradient(135deg,#081B4B,#E31E24)">👤</div>' : '');
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function showTyping(targetChat) {
  var chat = document.getElementById(targetChat || 'aiChat');
  if (!chat) return;
  var div = document.createElement('div');
  div.className = 'ai-msg ai-msg-bot'; div.id = 'aiTypingIndicator';
  div.innerHTML = '<div class="ai-msg-avatar">🤖</div>' +
    '<div class="ai-msg-bubble"><div class="ai-typing"><span></span><span></span><span></span></div></div>';
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function removeTyping() {
  var t = document.getElementById('aiTypingIndicator');
  if (t) t.remove();
}

function callAI(userMsg, systemPrompt, history, onReply) {
  var messages = history.slice(-6).concat([{role:'user', content: userMsg}]);
  fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: systemPrompt,
      messages: messages
    })
  })
  .then(function(resp){ return resp.json(); })
  .then(function(data){
    var reply = (data.content && data.content[0] && data.content[0].text)
      ? data.content[0].text
      : 'Lo siento, hubo un problema. Intenta de nuevo. 🙏';
    onReply(reply);
  })
  .catch(function(){
    onReply('Sin conexión. Prueba más tarde o contáctanos por WhatsApp. 📱');
  });
}

function sendAiMsg() {
  if (aiThinking) return;
  var inp = document.getElementById('aiInput');
  if (!inp) return;
  var msg = inp.value.trim();
  if (!msg) return;
  inp.value = '';
  aiThinking = true;
  var sendBtn = document.getElementById('aiSendBtn');
  if (sendBtn) sendBtn.disabled = true;

  addAiMsg(msg, true, 'aiChat');
  showTyping('aiChat');

  callAI(msg, AI_SYSTEM[aiMode], aiHistory, function(reply){
    removeTyping();
    addAiMsg(reply, false, 'aiChat');
    aiHistory.push({role:'user', content: msg});
    aiHistory.push({role:'assistant', content: reply});
    if (aiHistory.length > 12) aiHistory = aiHistory.slice(-12);
    aiThinking = false;
    if (sendBtn) sendBtn.disabled = false;
  });
}

/* ─── FLOATING CHAT ─── */
var floatOpen = false;
var floatThinking = false;

function openFloatChat() {
  document.getElementById('aiFloatOverlay').classList.add('open');
  document.getElementById('aiFloatSheet').classList.add('open');
  floatOpen = true;
}

function closeFloatChat() {
  document.getElementById('aiFloatOverlay').classList.remove('open');
  document.getElementById('aiFloatSheet').classList.remove('open');
  floatOpen = false;
}

function sendFloatMsg() {
  if (floatThinking) return;
  var inp = document.getElementById('aiFloatInput');
  if (!inp) return;
  var msg = inp.value.trim();
  if (!msg) return;
  inp.value = '';
  floatThinking = true;

  addAiMsg(msg, true, 'aiFloatMsgs');
  showTyping('aiFloatMsgs');

  callAI(msg, AI_SYSTEM.shop, aiFloatHistory, function(reply){
    var t = document.getElementById('aiTypingIndicator');
    if (t) t.remove();
    addAiMsg(reply, false, 'aiFloatMsgs');
    aiFloatHistory.push({role:'user', content: msg});
    aiFloatHistory.push({role:'assistant', content: reply});
    if (aiFloatHistory.length > 8) aiFloatHistory = aiFloatHistory.slice(-8);
    floatThinking = false;
  });
}

/* ─── STORE AI ASSIST (called from store detail) ─── */
function openStoreAI(storeName) {
  goPage('page-ai');
  setAiMode('shop');
  setTimeout(function(){
    var inp = document.getElementById('aiInput');
    if (inp) {
      inp.value = 'Háblame de ' + storeName + '. ¿Qué productos conviene comprar ahí y cuánto me costaría enviarlo a mi país?';
      sendAiMsg();
    }
  }, 400);
}

/* ─── INIT AI ─── */
function initAI() {
  var wt = document.getElementById('aiWelcomeTxt');
  if (wt) wt.textContent = AI_WELCOME[aiMode];
  renderAiSuggestions();
}

/* ─── INIT ─── */
updateHero();
resetHeroTimer();
renderStores();
initStoreSearch();
initAI();

