export default function Home() {
  return (
    <>
      <header>
        <div className="container nav">
          <div className="brand">
            <span className="brand-badge" aria-hidden="true"></span>
            <span>Kitesurfdag Brouwersdam</span>
          </div>
          <nav>
            <a href="#tickets" className="cta">Koop tickets</a>
          </nav>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="container hero-grid">
          <div>
            <div className="pill">🌊 Brouwersdam • 1 dag • All-in vibe</div>
            <h1>Wind, water, pizza & progress – alles in één perfecte surfdag</h1>
            <p className="lead">
              2,5u ochtendsessie met instructeur, 2u vrij surfen in de middag,
              lunchbuffet en pizza-diner op het strand. Geen gedoe – alleen jij en de wind.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="#tickets">Tickets kopen</a>
              <a className="btn btn-outline" href="#programma">Bekijk programma</a>
            </div>
          </div>
          <aside className="hero-card" aria-label="Hoogtepunten">
            <div className="row"><span className="dot" /> <strong>Les:</strong> 2,5u in kleine groepen (3–5 pers)</div>
            <div className="row"><span className="dot" /> <strong>Vrij surfen:</strong> 2u middag op Brouwersdam</div>
            <div className="row"><span className="dot" /> <strong>Eten:</strong> Lunchbuffet & pizza-diner</div>
            <div className="row"><span className="dot" /> <strong>Extra:</strong> Beachgames & Center Parcs vibe</div>
            <div className="row"><span className="badge">Beperkt aantal plekken • vol = vol</span></div>
          </aside>
        </div>
      </section>

      <section id="programma">
        <div className="container">
          <div className="section-head">
            <h2>Dagprogramma</h2>
            <p className="muted">Tijden indicatief, afgestemd op wind & getij.</p>
          </div>
          <div className="timeline">
            <div className="card">
              <h3>Ochtend</h3>
              <ul className="list">
                <li>08:30 — Aankomst & check-in</li>
                <li>09:30–12:00 — Kitesurfles (2,5u)</li>
                <li>12:15 — Warme douche & omkleden</li>
              </ul>
            </div>
            <div className="card">
              <h3>Middag</h3>
              <ul className="list">
                <li>12:30 — Lunchbuffet</li>
                <li>14:00–16:00 — Vrij surfen (2u)</li>
                <li>16:15 — Beachgames / relax</li>
              </ul>
            </div>
            <div className="card">
              <h3>Avond</h3>
              <ul className="list">
                <li>18:00 — Pizza-diner op het strand</li>
                <li>19:30 — Golden hour & afsluiting</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Tickets />

      <section id="faq">
        <div className="container">
          <div className="section-head">
            <h2>Veelgestelde vragen</h2>
            <p className="muted">Twijfel je? Check even hieronder.</p>
          </div>

          <details>
            <summary>Is dit geschikt voor beginners?</summary>
            <p>Ja! We werken met kleine lesgroepen (3–5 personen) en differentiëren op niveau. Beginners leren de basics, gevorderden krijgen techniek-boosts.</p>
          </details>
          <details>
            <summary>Moet ik eigen materiaal meenemen?</summary>
            <p>Lesmateriaal is aanwezig. Eigen gear meenemen mag altijd – handig als je al een favoriet board of bar hebt.</p>
          </details>
          <details>
            <summary>Wat als het weer tegenzit?</summary>
            <p>We plannen op wind & getij. Bij onvoldoende wind bieden we techniek-clinics, beachgames en alternatieve watermomenten. Safety first, fun guaranteed.</p>
          </details>
          <details>
            <summary>Kan ik mijn ticket annuleren?</summary>
            <p>Zie onze voorwaarden: tot 21 dagen 100% restitutie, 8–20 dagen 50%, binnen 7 dagen geen restitutie. Je mag jouw ticket altijd overdragen aan iemand anders.</p>
          </details>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="cta-band">
            <div>
              <strong>Dit wordt jouw surfdag.</strong><br />
              Wind, water, pizza & progress – alles geregeld.
            </div>
            <a className="btn btn-primary" href="#tickets">Koop tickets</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="container" style={{display:'flex',gap:16,flexWrap:'wrap',alignItems:'center',justifyContent:'space-between'}}>
          <small>© {new Date().getFullYear()} Kitesurfdag Brouwersdam</small>
          <small><a href="#">Voorwaarden</a> • <a href="#">Privacy</a> • <a href="#">Contact</a></small>
        </div>
      </footer>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.querySelectorAll('a[href^="#"]').forEach(a=>{
              a.addEventListener('click', e=>{
                const id=a.getAttribute('href').slice(1);
                const el=document.getElementById(id);
                if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
              });
            });
          `
        }}
      />
    </>
  );
}

function Tickets() {
  return (
    <section id="tickets" aria-labelledby="tickets-title">
      <div className="container">
        <div className="section-head">
          <h2 id="tickets-title">Tickets</h2>
          <p className="muted">Kies jouw moment – early voor voordeel, late voor FOMO.</p>
        </div>

        <div className="tickets">
          <TicketCard
            title="Early Bird"
            price="€119"
            strike="€135"
            limit="10 plekken"
            slug="early"
            note="Sluit bij uitverkoop of op datum X (wat eerst komt)."
          />
          <TicketCard
            title="Regular"
            price="€129"
            limit="20 plekken"
            slug="regular"
            note="Standaardprijs tot 10 dagen voor het event."
          />
          <TicketCard
            title="Late / Last-minute"
            price="€135"
            limit="10 plekken"
            slug="late"
            note="Opent 10 dagen vooraf of na 30+ verkochte tickets."
          />
        </div>

        <div style={{marginTop:18}} className="muted">
          Betalingen verlopen via Stripe Checkout (iDEAL, Bancontact, creditcard). Veilig & vertrouwd.
        </div>
      </div>
    </section>
  );
}

function TicketCard({ title, price, strike, limit, slug, note }) {
  const buy = async () => {
    try {
      const res = await fetch(`/api/checkout/${slug}`, { method: 'POST' });
      const data = await res.json();
      if (data?.url) window.location.href = data.url;
      else alert(data?.error || 'Kon afrekenen niet starten.');
    } catch (e) {
      alert('Er ging iets mis met afrekenen.');
    }
  };
  return (
    <div className="card ticket">
      <div className="meta">
        <strong>{title}</strong>
        <span className="limit">{limit}</span>
      </div>
      <p>
        <span className="price">{price}</span>{' '}
        {strike ? <span className="strike">{strike}</span> : null}
      </p>
      <ul className="list">
        <li>Les 2,5u + vrij surfen 2u</li>
        <li>Lunchbuffet & pizza-diner</li>
        <li>Beachgames inbegrepen</li>
      </ul>
      <button className="btn btn-primary" onClick={buy}>Koop {title}</button>
      <small className="muted">{note}</small>
    </div>
  );
}