<template>
  <v-list class="dialog-create-new-link">
    <div class="d-flex justify-space-between px-4">
      <div></div>
      <div class="dialog-icon" @click="$emit('closeModalAddNewLink')">
        <img class="ma-2" src="@/assets/svg/close.svg" alt="close" />
      </div>
    </div>
    <div class="modal-mask">
      <div class="modal-mask__title mb-5">Shorten a new link</div>
      <v-textarea
        v-model="form.destinationUrl"
        auto-grow
        label="Destination your URL"
        hint="Type or paste your URL"
        outlined
        dense
        rows="1"
        @input="validURL(form.destinationUrl)"
      ></v-textarea>
      <transition name="slide-fade">
        <div v-if="valid || edit">
          <v-row>
            <v-col cols="12" md="6" class="py-0">
              <div class="modal-mask__sub-title">Branded domain</div>
              <v-select
                v-model="form.domain"
                class="dialog-domain"
                :items="tempDomains"
                item-text="name"
                item-value="id"
                dense
                outlined
                label="Domain"
                :disabled="loading"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" class="py-0">
              <div class="modal-mask__sub-title">Slash tag</div>
              <v-text-field
                v-model="form.slashTag"
                class="dialog-slash-tag"
                outlined
                dense
                :disabled="loading"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" class="py-0">
              <div class="modal-mask__sub-title">Workspace belong to</div>
              <v-select
                v-model="form.workspace"
                class="dialog-workspace"
                :items="tempWorkspaces"
                item-text="name"
                label="Workspace"
                item-value="id"
                dense
                outlined
                menu-props="auto"
                :disabled="loading"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" class="py-0">
              <div class="modal-mask__sub-title">Web title</div>
              <v-text-field
                v-model="form.title"
                class="dialog-web-title"
                placeholder="Web title"
                outlined
                dense
                :disabled="loading"
              ></v-text-field>
            </v-col>
          </v-row>
          <div class="d-flex justify-space-between">
            <div></div>
            <div
              :disabled="loading"
              class="modal-mask__button"
              @click="createNewLink"
            >
              Create link
            </div>
          </div>
        </div>
      </transition>
    </div>
    <client-only>
      <infinite-loading
        spinner="waveDots"
        @infinite="infiniteScroll"
      ></infinite-loading>
    </client-only>
    <v-snackbar v-model="showAlert" top color="success">
      Create new link successfully
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="showAlert = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="showAlert403" top color="error">
      Slash tag is exist
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="showAlert = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-list>
</template>

<script>
import debounce from 'lodash.debounce';
import {
  getDomains,
  getWorkspaces,
  getTitleUrl,
  getSlashTag,
  checkSlashTag,
  createNewLink,
} from '@/services/api';
export default {
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    domains: [],
    workspaces: [],
    token: '',
    loading: false,
    pageDomains: 1,
    pageWorkspaces: 1,
    showAlert: false,
    showAlert403: false,
    valid: false,
    form: {
      destinationUrl: '',
      title: '',
      slashTag: '',
      domain: '',
      workspace: '',
    },
  }),
  computed: {
    tempDomains() {
      return this.domains.map((x) => {
        return {
          id: x.id,
          name: x.name,
        };
      });
    },
    tempWorkspaces() {
      return this.workspaces.map((x) => {
        return {
          id: x.id,
          name: x.name,
        };
      });
    },
  },
  created() {
    if (typeof localStorage !== 'undefined' && localStorage.token) {
      this.token = localStorage.token;
    }
  },

  methods: {
    reload() {
      window.location.reload();
    },
    validURL: debounce(async function(str) {
      const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$',
        'i'
      ); // fragment locator
      this.valid = !!pattern.test(str);
      if (pattern.test(str)) {
        await Promise.all([this.getTitle(str), this.getSlashTag(str)]);
      }
      return this.valid;
    }, 300),
    async getTitle(url) {
      try {
        const res = await getTitleUrl(url);
        const { status, data } = res.data;
        if (status === 200) {
          const { title } = data;
          console.log(title);
          this.form.title = title;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getSlashTag(url) {
      try {
        const res = await getSlashTag(url);
        const { status, data } = res.data;
        if (status === 200) {
          this.form.slashTag = data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async infiniteScroll($state) {
      const { token, pageDomains, pageWorkspaces } = this;
      try {
        const resDomains = await getDomains(token, pageDomains, true);
        const resWorkspaces = await getWorkspaces(token, pageWorkspaces);

        const statusDomains = resDomains.data.status;
        const statusWorkspaces = resWorkspaces.data.status;

        if (statusDomains === 200) {
          this.pageDomains += 1;
          const { domains } = resDomains.data.data;
          if (domains.length) {
            this.domains.push(...domains);
            $state.loaded();
          } else {
            $state.complete();
          }
        }
        if (statusWorkspaces === 200) {
          this.pageWorkspaces += 1;
          const { workspaces } = resWorkspaces.data.data;
          if (workspaces.length) {
            this.workspaces.push(...workspaces);
            $state.loaded();
          } else {
            $state.complete();
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async createNewLink() {
      this.loading = true;
      const { destinationUrl, domain, workspace, title, slashTag } = this.form;
      try {
        const check = await checkSlashTag(slashTag);
        const { data } = check.data;
        if (!data.exists) {
          const res = await createNewLink(
            this.token,
            destinationUrl,
            domain,
            slashTag,
            title,
            workspace
          );
          const { status } = res.data;
          if (status === 201) {
            this.showAlert = true;
            setTimeout(() => {
              this.$emit('closeModalAddNewLink');
              this.reload();
              this.loading = false;
            }, 2000);
          }
          if (status === 403) {
            this.showAlert403 = true;
            setTimeout(() => {
              this.$emit('closeModalAddNewLink');
              this.reload();
              this.loading = false;
            }, 2000);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-create-new-link {
  height: 100%;
}
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
  &__sub-title {
    color: #595d66;
    letter-spacing: -0.1px;
    font-weight: 500;
  }
  @media screen and (max-width: 1368px) {
    padding: 3vh 4vh;
    &__sub-title {
      font-size: 15px;
    }
    .dialog-domain::v-deep label,
    .dialog-domain::v-deep input,
    .dialog-slash-tag::v-deep label,
    .dialog-slash-tag::v-deep input,
    .dialog-workspace::v-deep label,
    .dialog-workspace::v-deep input,
    .dialog-web-title::v-deep label,
    .dialog-web-title::v-deep input {
      font-size: 15px;
    }
  }
  @media screen and (max-width: 960px) {
    padding: 2.5vh 3.5vh;
    &__sub-title {
      font-size: 14px;
    }
    .dialog-domain::v-deep label,
    .dialog-domain::v-deep input,
    .dialog-slash-tag::v-deep label,
    .dialog-slash-tag::v-deep input,
    .dialog-workspace::v-deep label,
    .dialog-workspace::v-deep input,
    .dialog-web-title::v-deep label,
    .dialog-web-title::v-deep input {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 600px) {
    padding: 2vh 3vh;
    .dialog-domain::v-deep label,
    .dialog-domain::v-deep input,
    .dialog-slash-tag::v-deep label,
    .dialog-slash-tag::v-deep input,
    .dialog-workspace::v-deep label,
    .dialog-workspace::v-deep input,
    .dialog-web-title::v-deep label,
    .dialog-web-title::v-deep input {
      font-size: 13px;
    }
  }
}
</style>
