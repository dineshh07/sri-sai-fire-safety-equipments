(() => {
const PHONE = "919894792449";
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(hover:hover) and (min-width:901px)").matches;
const wa = (t) => `https://wa.me/${PHONE}?text=${encodeURIComponent(t)}`;

/* ---- Content (edit freely; add specs only when verified) ---- */
const products = [
 ["Fire Extinguishers","Portable extinguishers for offices, factories, vehicles and homes."],
 ["Fire Alarm Systems","Alarm panels, call points and sounders for early warning."],
 ["Fire Hydrant Systems","Hydrant systems for building and campus water supply."],
 ["Fire Sprinkler Systems","Sprinkler solutions for automatic fire control."],
 ["Fire Detection Systems","Detectors and control equipment for early detection."],
 ["Emergency Lights","Lighting to help people exit safely during outages."],
 ["Fire Safety Signages","Clear signs for exits, equipment and hazards."],
 ["Personal Protective Equipment (PPE)","Protective equipment for workers across industries."],
 ["Industrial Safety Shoes","Protective footwear for demanding work sites."],
 ["Safety Gloves","Hand protection for industrial and workplace tasks."],
 ["Smoke Detectors","Smoke detection for rooms, corridors and commercial spaces."],
 ["Fire Buckets and Accessories","Fire buckets, stands and supporting accessories."],
 ["Fire Suppression Systems","Suppression solutions for protected equipment and rooms."],
 ["Hose Reels and Fire Nozzles","Hose reels, hoses and nozzles for firefighting points."],
 ["First Aid Kits","First aid kits for workplaces, vehicles and facilities."]];
const services = [
 ["Fire Safety Equipment Supply","Supply of fire safety equipment for your site."],
 ["Fire Extinguisher Supply","Extinguishers matched to your requirement."],
 ["Fire Alarm System Solutions","Alarm system solutions for buildings."],
 ["Fire Hydrant System Solutions","Hydrant system solutions for premises."],
 ["Fire Sprinkler System Solutions","Sprinkler system solutions for premises."],
 ["Fire Safety Installation","Installation of fire safety equipment."],
 ["Fire Safety Inspection","Inspection of fire safety equipment."],
 ["Fire Safety Maintenance","Maintenance support for safety equipment."],
 ["Industrial Safety Equipment Supply","Safety equipment for industrial workplaces."],
 ["Personal Protective Equipment Supply","PPE for your team."],
 ["Fire Safety Consultation","Guidance on your safety requirements."],
 ["Workplace Safety Solutions","Practical solutions for safer workplaces."]];
const industries = [
 ["Manufacturing Industries","Equipment for plants and production floors."],
 ["Commercial Buildings","Protection for shops, complexes and towers."],
 ["Hospitals and Healthcare","Safety products for care facilities."],
 ["Educational Institutions","Safety for schools and colleges."],
 ["Hotels and Hospitality","Safety for guests and staff."],
 ["Warehouses and Logistics","Protection for storage and dispatch areas."],
 ["Construction Sites","Safety equipment for active sites."],
 ["Residential Buildings","Fire safety for apartments and homes."],
 ["Offices and Corporate Spaces","Safety for modern workplaces."]];

/* ---- Render ---- */
const pad = (n) => String(n + 1).padStart(2, "0");
$("#pGrid").innerHTML = products.map((p, i) => `
 <article class="card tilt" tabindex="0" data-i="${i}">
  <div class="ph" data-label="Product image"><span class="num">${pad(i)}</span></div>
  <h3>${p[0]}</h3><p>${p[1]}</p>
  <div class="row"><button class="btn ghost" data-open="${i}">Explore products</button><a class="btn" href="${wa("Hello, I'd like a quote for: " + p[0])}" target="_blank" rel="noopener">Request a quote</a></div>
 </article>`).join("");
$("#sList").innerHTML = services.map(s => `<div class="item" tabindex="0"><h3>${s[0]}</h3><p>${s[1]}</p><em>Learn more</em></div>`).join("");
$("#iGrid").innerHTML = industries.map(s => `<div class="ind rv"><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join("");
$("#ddList").innerHTML = products.map((p, i) => `<a href="#products" data-open="${i}">${p[0]}</a>`).join("");
$("#fProd").innerHTML = products.slice(0, 6).map(p => `<a href="#products">${p[0]}</a>`).join("");
$("#topic").insertAdjacentHTML("beforeend", [...products, ...services].map(x => `<option>${x[0]}</option>`).join(""));
$("#yr").textContent = new Date().getFullYear();
$$(".wa").forEach(a => { a.href = wa("Hello Sri Sai Fire Safety Equipments, I'd like to discuss my safety requirements."); a.target = "_blank"; a.rel = "noopener"; });

/* ---- Nav ---- */
const nav = $("#nav"), menu = $("#menu"), burger = $(".burger");
addEventListener("scroll", () => nav.classList.toggle("solid", scrollY > 40), { passive: true });
const setMenu = (o) => { menu.classList.toggle("open", o); burger.setAttribute("aria-expanded", o); document.body.style.overflow = o ? "hidden" : ""; };
burger.onclick = () => setMenu(!menu.classList.contains("open"));
$$("#menu a").forEach(a => a.addEventListener("click", () => setMenu(false)));

/* ---- Product detail view ---- */
const detail = $("#detail");
const openDetail = (i) => {
  $("#dTitle").textContent = products[i][0]; $("#dDesc").textContent = products[i][1];
  $("#dEnq").href = wa("Hello, I'd like to enquire about: " + products[i][0]);
  $("#dEnq").target = "_blank"; detail.hidden = false;
  const box = $(".ph", detail); $$("img", box).forEach(x => x.remove()); box.classList.remove("has"); put(box, "products/" + pad(i), products[i][0]);
  requestAnimationFrame(() => detail.classList.add("open")); document.body.style.overflow = "hidden"; $(".close").focus();
};
const closeDetail = () => { detail.classList.remove("open"); document.body.style.overflow = ""; };
document.addEventListener("click", (e) => {
  const o = e.target.closest("[data-open]"); if (o) { e.preventDefault(); setMenu(false); return openDetail(+o.dataset.open); }
  const c = e.target.closest(".card"); if (c && !e.target.closest("a")) openDetail(+c.dataset.i);
  if (e.target.closest(".close")) closeDetail();
});
addEventListener("keydown", (e) => { if (e.key === "Escape") closeDetail(); if (e.key === "Enter" && e.target.classList.contains("card")) openDetail(+e.target.dataset.i); });

/* ---- Reveal, counters, process line ---- */
$$(".about article,.why li,.steps li").forEach(el => el.classList.add("rv"));
const io = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15 });
$$(".rv").forEach((el, i) => { el.style.transitionDelay = (i % 3) * 90 + "ms"; io.observe(el); });

const cio = new IntersectionObserver((es) => es.forEach(e => {
  if (!e.isIntersecting) return; cio.unobserve(e.target);
  const n = +e.target.dataset.n, s = e.target.dataset.s;
  if (reduce) return (e.target.textContent = n + s);
  const t0 = performance.now(), d = 1800;
  const tick = (t) => { const k = Math.min((t - t0) / d, 1); e.target.textContent = Math.round(n * (1 - Math.pow(1 - k, 4))) + (k === 1 ? s : ""); if (k < 1) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
}), { threshold: .6 });
$$("[data-n]").forEach(el => cio.observe(el));

const steps = $("#steps"), sl = $$("li", steps);
const prog = () => {
  const r = steps.getBoundingClientRect(), p = Math.max(0, Math.min(1, (innerHeight * .8 - r.top) / (r.height + 80)));
  steps.style.setProperty("--p", p); sl.forEach((li, i) => li.classList.toggle("on", p > i / sl.length + .02));
};
addEventListener("scroll", prog, { passive: true }); prog();

/* ---- Pointer effects (desktop only) ---- */
if (fine && !reduce) {
  const cur = $(".cursor"); let x = 0, y = 0, cx = 0, cy = 0;
  addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; cur.style.opacity = 1; });
  (function loop() { cx += (x - cx) * .2; cy += (y - cy) * .2; cur.style.transform = `translate(${cx - 7}px,${cy - 7}px)`; requestAnimationFrame(loop); })();
  document.addEventListener("mouseover", (e) => cur.classList.toggle("big", !!e.target.closest("a,button,.card,.item")));

  $$(".mag").forEach(b => {
    b.addEventListener("mousemove", (e) => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`; });
    b.addEventListener("mouseleave", () => b.style.transform = "");
  });
  document.addEventListener("mousemove", (e) => {
    const t = e.target.closest(".tilt"); $$(".tilt").forEach(el => { if (el !== t) el.style.transform = ""; });
    if (!t) return; const r = t.getBoundingClientRect();
    t.style.transform = `perspective(900px) rotateY(${((e.clientX - r.left) / r.width - .5) * 8}deg) rotateX(${-((e.clientY - r.top) / r.height - .5) * 8}deg)`;
  });
  const stage = $("#stage");
  stage.addEventListener("mousemove", (e) => { const r = stage.getBoundingClientRect(); $(".ext", stage).style.transform = `rotateY(${((e.clientX - r.left) / r.width - .5) * 24}deg) rotateX(${-((e.clientY - r.top) / r.height - .5) * 12}deg)`; });
  stage.addEventListener("mouseleave", () => $(".ext", stage).style.transform = "");
  const par = $$(".par"); addEventListener("scroll", () => par.forEach(p => p.style.transform = `translateY(${(p.getBoundingClientRect().top - innerHeight / 2) * -.06}px)`), { passive: true });
}


/* ---- premium layer ---- */
$("#mq").innerHTML = [...products, ...products].map(p => `<span>${p[0]}</span>`).join("");
$$("h2.rv").forEach(h => {
  let i = 0; h.classList.remove("rv");
  h.innerHTML = h.textContent.split(" ").map(w => `<span class="w"><span style="--i:${i++}">${w}&nbsp;</span></span>`).join("");
  io.observe(h);
});
const bar = $(".progress");
addEventListener("scroll", () => bar.style.transform = `scaleX(${scrollY / (document.documentElement.scrollHeight - innerHeight)})`, { passive: true });


/* ---- Real images: put files in /images (see images/README.txt) ---- */
function put(el, base, alt) {
  const ext = ["webp", "jpg", "jpeg", "png"];
  (function go(k) {
    if (k >= ext.length) return;
    const im = new Image(); im.alt = alt; im.decoding = "async";
    im.onload = () => { el.classList.add("has"); el.prepend(im); };
    im.onerror = () => go(k + 1);
    im.src = `images/${base}.${ext[k]}`;
  })(0);
}
$$(".card .ph").forEach((el, i) => put(el, "products/" + pad(i), products[i][0]));
$$(".ind").forEach((el, i) => put(el, "industries/" + (i + 1), industries[i][0]));
$$(".projects .ph").forEach((el, i) => put(el, "projects/" + (i + 1), "Project " + (i + 1)));
put($(".intro .ph"), "intro", "Fire safety equipment");
(function () {
  const im = new Image(); im.alt = "Fire safety equipment"; im.className = "ext";
  im.onload = () => { $(".ext", $("#stage")).replaceWith(im); };
  im.src = "images/hero.png";
})();

/* ---- Form ---- */
const form = $("#form"), status = $("#status");
form.addEventListener("submit", (e) => {
  e.preventDefault(); let bad = null;
  $$("[required]", form).forEach(f => {
    const ok = f.value.trim() && (f.type !== "email" || /^\S+@\S+\.\S+$/.test(f.value)) && (f.type !== "tel" || f.value.replace(/\D/g, "").length >= 10);
    f.setAttribute("aria-invalid", !ok); if (!ok && !bad) bad = f;
  });
  if (bad) { status.style.color = "#b3261e"; status.textContent = "Please check the highlighted fields and try again."; return bad.focus(); }
  const d = Object.fromEntries(new FormData(form));
  const msg = `Hello Sri Sai Fire Safety Equipments,\nName: ${d.name}\nCompany: ${d.company || "-"}\nPhone: ${d.phone}\nEmail: ${d.email}\nInterested in: ${d.topic}\n${d.message}`;
  window.open(wa(msg), "_blank", "noopener");
  status.style.color = "#173D2B"; status.textContent = "Thanks. Your enquiry opened in WhatsApp. Press send there to reach our team."; form.reset();
});
})();
