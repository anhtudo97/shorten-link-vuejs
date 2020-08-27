<template>
  <v-list>
    <div class="d-flex justify-space-between px-4">
      <div></div>
      <div class="dialog-icon" @click="$emit('closeModalAddNewLink')">
        <img class="ma-2" src="@/assets/svg/close.svg" alt="close" />
      </div>
    </div>
    <div class="modal-mask">
      <div class="modal-mask__title mb-5">Shorten a new link</div>
      <v-textarea
        v-model="destinationUrl"
        auto-grow
        label="Destination your URL"
        hint="Type or paste your URL"
        outlined
        rows="1"
      ></v-textarea>
      <transition name="slide-fade">
        <div v-if="validURL(destinationUrl)">
          <v-row>
            <v-col cols="12" md="6">
              <v-select :items="tempDomains" label="Domain" dense outlined></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Slash tag" outlined dense></v-text-field>
            </v-col>
          </v-row>
          <div class="d-flex justify-space-between">
            <div></div>
            <div class="modal-mask__button">Create link</div>
          </div>
        </div>
      </transition>
    </div>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data: () => ({
    destinationUrl: '',
  }),
  computed: {
    ...mapGetters({
      domains: 'domains/getDomains',
    }),
    tempDomains() {
      return this.domains.map((x) => x.domain);
    },
  },
  methods: {
    validURL(str) {
      const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$',
        'i'
      ); // fragment locator
      return !!pattern.test(str);
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-icon {
  cursor: pointer;
  height: 32px;
  background-color: #f9f9fa;
  border-radius: 50%;
  img {
    object-fit: cover;
    width: 16px;
    height: auto;
  }
}
.modal-mask {
  font-family: Poppins, sans-serif;
  padding: 4vh 5vh;
  &__title {
    font-size: 26px;
  }
  &__button {
    cursor: pointer;
    color: #fff;
    font-weight: 500;
    padding: 10px 60px;
    border-radius: 10px;
    background-color: #3c64b1;
    &:hover {
      background-color: #2a5bd7;
    }
  }
}
</style>
