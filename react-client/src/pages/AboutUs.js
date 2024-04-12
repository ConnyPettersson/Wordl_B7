import "./AboutUs.css";

const AboutUs = () => {
  return (
    <>
      <main>
        <section>
          <h2>Projektinformation</h2>
          <p style={{maxWidth: '500px'}}>
            Detta är en Wordle-inspirerad applikation utvecklad som en del av
            ett kursprojekt. Spelet är designat för att testa din förmåga att
            gissa ord baserat på ledtrådar. Välj mellan ord som består av 1-25 
            bokstäver. Gissar du mer än 100 gånger blir det automatiskt Game Over!
          </p>
        </section>
        <section>
          <h2>Funktioner</h2>
          <ul>
            <li>Spela spelet på startsidan</li>
            <li>Highscores visas på en server-side renderad sida</li>
            <li>Läs mer om projektet på denna statiska sida</li>
          </ul>
        </section>
        <section>
          <h2>Utvecklingsteam</h2>
          <p>Just detta spel har utvecklats av Conny från Varberg.</p>
        </section>
      </main>
      <footer>
        <p>© 2024 pedalConny aka Conny Hårdkod</p>
      </footer>
    </>
  );
};

export default AboutUs;
