<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>



<template>
  <!-- H1 FOR SEO FRIENDLY -->
  <h1 class="visually-hidden">Giogi Crochet pupazzi uncinetto</h1>

  <!-- HERO SECTION -->
  <header>
    <!-- mobile -->
    <img src="@/assets/images/giogi-header-mobile.png" alt="Giogi Crochet – logo del sito" class="header-mobile" />
    <!-- desktop -->
    <div class="header-desktop">
      <img src="@/assets/images/giogi-header-desktop-label.png" class="label" alt="Testo hero" />
      <img src="@/assets/images/giogi-header-desktop-figure.png" class="figure" alt="Figura persona con animale" />
    </div>
  </header>

  <!-- <h2 class="mt-5">{{ $t('home.subtitle') }}</h2> -->
  <div class="text-center my-5">
    <button class="btn btn-one mb-5" @click="() => router.push(`/products`)">
      {{ $t('home.CTA') }}
    </button>
  </div>

  <!-- CHI SONO SECTION -->
  <section class="about my-5">
    <div class="container">
      <div class="about-content">
        <div class="about-text">
          <h3 class="section-title">{{ $t('home.about.title') }}</h3>
          <p v-html="$t('home.about.text1')"></p>
          <p v-html="$t('home.about.text2')"></p>
        </div>
        <div class="about-image">
          <!-- Sostituisci con foto vera di Giogi -->
          <img
            src="https://images.pexels.com/photos/10474398/pexels-photo-10474398.jpeg?cs=srgb&dl=pexels-rdne-10474398.jpg&fm=jpg"
            alt="Giogi mentre lavora all'uncinetto" />
        </div>
      </div>
    </div>
  </section>

  <!-- PERCHE' SCEGLIERE -->
  <section class="why-choose">
    <h3 class="section-title">{{ $t('home.why.title') }}</h3>
    <div class="row g-3 g-md-5">
      <div class="feature col-12 col-md-6 col-lg-3">
        <img class="feature-image" src="@/assets/images/gomitolo.png" alt="">
        <h4>{{ $t('home.why.handmade.title') }}</h4>
        <p>{{ $t('home.why.handmade.text') }}</p>
      </div>
      <div class="feature col-12 col-md-6 col-lg-3">
        <img class="feature-image" src="@/assets/images/cuore.svg" alt="">
        <h4>{{ $t('home.why.love.title') }}</h4>
        <p>{{ $t('home.why.love.text') }}</p>
      </div>
      <div class="feature col-12 col-md-6 col-lg-3">
        <img class="feature-image" src="@/assets/images/regalo.svg" alt="">
        <h4>{{ $t('home.why.gift.title') }}</h4>
        <p>{{ $t('home.why.gift.text') }}</p>
      </div>
      <div class="feature col-12 col-md-6 col-lg-3">
        <img class="feature-image" src="@/assets/images/orso.svg" alt="">
        <h4>{{ $t('home.why.safe.title') }}</h4>
        <p>{{ $t('home.why.safe.text') }}</p>
      </div>
    </div>
  </section>

  <!-- GALLERY CREAZIONI -->
  <section class="gallery-section my-5">
    <h3 class="section-title">{{ $t('home.gallery.title') }}</h3>
    <div class="row g-2">
      <!-- COLONNA SINISTRA -->
      <div class="col-12 col-md-3 d-flex flex-row flex-md-column gap-3">
        <div class="gallery-item tall">
          <img src="@/assets/images/gallery-1.webp" alt="Creazione 1" />
        </div>
        <div class="gallery-item small">
          <img src="@/assets/images/gallery-2.webp" alt="Creazione 2" />
        </div>
      </div>
      <!-- COLONNA CENTRALE -->
      <div class="col-12 col-md-6">
        <div class="gallery-item big">
          <img src="@/assets/images/gallery-3.webp" alt="Creazione 3" />
        </div>
      </div>
      <!-- COLONNA DESTRA -->
      <div class="col-12 col-md-3 d-flex flex-row flex-md-column gap-3">
        <div class="gallery-item small">
          <img src="@/assets/images/gallery-4.webp" alt="Creazione 4" />
        </div>
        <div class="gallery-item tall">
          <img src="@/assets/images/gallery-5.webp" alt="Creazione 5" />
        </div>
      </div>
    </div>
  </section>

  <!-- CTA FINALE COMMISSIONI -->
  <section class="final-cta">
    <div class="cta-content">
      <h3>{{ $t('home.customOrder.title') }}</h3>
      <p>{{ $t('home.customOrder.text') }}</p>
      <button class="btn btn-two fs-5" @click="() => router.push('/contatti')">
        {{ $t('home.customOrder.button') }}
      </button>
    </div>
  </section>
</template>



<style scoped lang="scss">
// responsive header section con immagini hero
header {
  .header-mobile {
    display: block;
    width: 80vw;
    margin: 0 auto;

    @media (min-width: $breakpoint-md) {
      display: none;
    }
  }

  .header-desktop {
    display: none;

    @media (min-width: $breakpoint-md) {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      margin: 0 auto;
      width: clamp(50%, 35vw, 60%);
    }

    img {
      width: 100%;
      height: auto;

      &.figure {
        width: clamp(20%, 20vw, 30%);
      }
    }
  }

}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  font-family: $font-family-hand;
  text-align: center;
  margin-bottom: 2.5rem;
}


//about me SECTION ----------------
.about {
  background: linear-gradient(165deg,
      $color-white 20%,
      $color-primary 50%);
  padding: 80px 0;
  border-radius: 10px;

  @media (max-width: $breakpoint-lg) {
    background: linear-gradient(45deg,
        $color-white 30%,
        $color-primary 70%);
    padding: 50px 0;
  }

  .about-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 50px;

    @media (max-width: $breakpoint-lg) {
      flex-direction: column;
      gap: 40px;
    }

    .about-image {
      width: 400px;

      @media (max-width: $breakpoint-lg) {
        width: 330px;
      }

      img {
        width: 100%;
        height: auto;
        border-radius: 5px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      }
    }

    .about-text {
      flex: 1;

      h3 {
        text-align: start;

        @media (max-width: $breakpoint-lg) {
          text-align: center;
        }
      }

      p {
        font-size: 1.25rem;
        line-height: 1.6;
        margin-bottom: 1.2rem;

        :deep(span) {
          color: $color-primary-800;
          text-decoration: underline;
        }

        @media (max-width: $breakpoint-lg) {
          text-align: center;
        }
      }
    }
  }
}


// PERCHE' SCEGLIERE
.why-choose {
  padding: 80px 0;

  .feature {
    text-align: center;

    .feature-image {
      width: 70px;
      margin-bottom: 0.9rem;
    }

    h4 {
      font-size: 1.7rem;
      font-family: $font-family-hand;
      color: $color-primary-900;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1.1rem;
    }
  }
}


// GALLERY
.gallery-section {
  // padding: 80px 0;

  .row {
    width: 75%;
    margin: 0 auto;

    @media (max-width: $breakpoint-lg) {
      width: 100%;
    }
  }



  .gallery-item {
    overflow: hidden;
    border-radius: 5px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform .3s ease;
    }

    &:hover img {
      transform: scale(1.03);
    }
  }

  /* Altezze */
  .gallery-item.small {
    height: 35%;
  }

  .gallery-item.tall {
    height: 65%;
  }

  .gallery-item.big {
    height: 100%;
  }

  /* Mobile: tutto fluido */
  @media (max-width: $breakpoint-md) {

    .gallery-item.small,
    .gallery-item.tall,
    .gallery-item.big {
      height: auto;
      aspect-ratio: 1 / 1;
    }
  }
}



// CTA FINALE
.final-cta {
  padding: 80px 0;

  .cta-content {
    text-align: center;
    color: $color-black;

    h3 {
      font-size: 2.2rem;
      font-family: $font-family-hand;
      margin-bottom: 1rem;

      @media (max-width: $breakpoint-md) {
        font-size: 1.7rem;
      }
    }

    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      max-width: 600px;
      margin: 20px auto;

      @media (max-width: $breakpoint-md) {
        font-size: 1rem;
      }
    }
  }
}
</style>