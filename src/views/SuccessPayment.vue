<script setup lang="ts">

</script>


<template>
    <div class="conatiner-success-payment">
        <img class="success-image mb-4" src="@/assets/images/lucky-success.jpg" alt="Successo pagamento" />
        <h2 class="mb-2 fs-1">Pagamento completato!</h2>
        <p class="lead text-center">
            Grazie mille per il tuo ordine! Riceverai aggiornamenti tramite email non appena l’ordine verrà elaborato.
        </p>
        <div class="d-flex justify-content-center gap-4 mt-4 w-100">
            <router-link to="/orders" class="btn btn-one">
                Visualizza ordine
            </router-link>
            <router-link to="/" class="btn btn-one">
                Torna alla home <i class="bi bi-house-door-fill"></i>
            </router-link>
        </div>

    </div>
</template>


<style scoped lang="scss">
.conatiner-success-payment {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
        font-family: $font-family-hand;
    }

    // Immagine di successo pagamento
    .success-image {
        width: 20vw;

        @media (max-width: $breakpoint-lg) {
            width: 250px;
        }
    }
}
</style>
