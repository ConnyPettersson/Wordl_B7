import './AboutUs.css';

const AboutUs = () => {
  return (
    <>
  <main>
        <section>
            <h2>Projektinformation</h2>
            <p>Detta är en Wordle-inspirerad applikation utvecklad som en del av ett kursprojekt. Spelet är designat för att testa din förmåga att gissa ord baserat på ledtrådar.</p>
        </section>
        <section>
            <h2>Funktioner</h2>
            <ul>
                <li>Spela spelet på startsidan</li>
                <li>Visa highscores på en server-side renderad sida</li>
                <li>Läs mer om projektet på denna statiska sida</li>
            </ul>
        </section>
        <section>
            <h2>Utvecklingsteam</h2>
            <p>Projektet har utvecklats av studenter från Lernia.</p>
        </section>
    </main>
    <footer>
        <p>© 2024 pedalConny</p>
    </footer>
    </>
  );
};

export default AboutUs;