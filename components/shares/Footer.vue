<template>
  <div class="footer ma-0">
    <v-col cols="12" md="8" class="mx-auto py-0 py-md-3">
      <v-row class="justify-space-between">
        <v-col cols="12" sm="6" class="d-flex justify-center justify-md-start">
          <nuxt-link to="/terms-conditions">
            <div class="footer-title">Terms & Conditions</div>
          </nuxt-link>
          <div class="rect-20"></div>
          <nuxt-link to="/privacy-policy">
            <div class="footer-title">Privacy Policy</div>
          </nuxt-link>
        </v-col>
        <v-col cols="12" sm="6" class="footer-title text-center text-md-right"
          >Relinks team © Copyright 2020</v-col
        >
      </v-row>
    </v-col>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  font-family: Montserrat, sans-serif;
  background-color: #263849;
  .footer-title {
    color: white;
    font-weight: 600;
    line-height: 24px;
  }
  .rect-20 {
    width: 30px;
  }
  @media (max-width: 1366px) {
    padding: 6px 5px;
    .footer-title {
      font-size: 14px;
      line-height: 22px;
    }
  }
  @media (max-width: 960px) {
    padding: 0;
    .footer-title {
      font-size: 13px;
      line-height: 20px;
    }
  }
  @media (max-width: 600px) {
    .footer-title {
      font-size: 12px;
      line-height: 18px;
    }
  }
}
</style>
