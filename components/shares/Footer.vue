<template>
  <v-row class="footer ma-0">
    <v-col cols="12" md="8" class="mx-auto py-0 py-md-3">
      <v-row class="justify-space-between">
        <v-col cols="12" sm="6" class="d-flex justify-center justify-md-start">
          <div class="footer-title">Terms & Conditions</div>
          <div class="rect-20"></div>
          <div class="footer-title">Privacy Policy</div>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          class="footer-title text-center text-md-right"
        >God Group © Copyright 2020</v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  font-family: Montserrat, sans-serif;
  padding: 12px 10px;
  background-color: #263849;
  .footer-title {
    color: white;
    font-weight: 600;
    font-size: 16px;
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
      font-size: 12px;
      line-height: 20px;
    }
  }
}
</style>
