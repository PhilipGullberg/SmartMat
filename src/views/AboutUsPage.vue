<template>
  <div class="about-us">
    <header>
      <nav>
        <!-- Navigation Links -->
      </nav>
    </header>

    <section class="hero">
      <h1>Skapar framtidens måltidsplanering</h1>
      <h2>Träffa innovatörerna bakom appen för AI-driven måltidsplanering.</h2>
    </section>

    <section class="bio-section">
      <div class="bio">
        <img src="../assets/us.webp"/>
        <img src="../assets/real_us.jpg"/>
        <h2>William Friefeldt och Philip Gullberg</h2>
        <h3>Två personer som studerade tillsammans på KTH, nu bygger de hobbyprojekt tillsammans</h3>
      </div>
    </section>

    <section class="vision">
      <h2>Vår Vision</h2>
      <h3>Att revolutionera måltidsplanering och upptäckt av recept med hjälp av banbrytande AI, göra hälsosam mat tillgänglig och spännande för alla.</h3>
    </section>

    <footer>
      <!-- Sidfotsinnehåll här -->
    </footer>
  </div>
</template>

<script>
export default {
  name: 'AboutUsPage',
  data() {
    
  }
}
</script>

<style scoped>
.about-us{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin:10rem;
    margin-top:2rem;
}
/* Add your CSS styling here */
.hero, .bio-section, .vision, footer {
  padding: 10px;
  text-align: center;
}

.bio {
  margin-top: 2rem;
}
.hero h1{
    font-size: 48px;
}

.bio img {
  max-width: 250px; /* Adjust as needed */
  max-height: 250px; /* Adjust as needed */
  border-radius: 50%;
  margin-left:1rem;

}
</style>

