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
        <div v-if="valid || edit || loading">
          <div v-if="!loading">
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
                  :label="form.domain"
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
                  :disabled="loading || edit"
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
                @click="callAction"
              >{{ edit ? 'Update Link' : 'Create link' }}</div>
            </div>
          </div>
          <div v-else class="d-flex justify-center">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>
        </div>
      </transition>
    </div>
    <client-only>
      <infinite-loading spinner="waveDots" @infinite="infiniteScroll"></infinite-loading>
    </client-only>
    <v-snackbar v-model="showAlert" top color="success">
      {{ edit ? 'Update link successfully' : 'Create new link successfully' }}
      <template
        v-slot:action="{ attrs }"
      >
        <v-btn color="white" text v-bind="attrs" @click="showAlert = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="showAlert403" top color="error">
      Slash tag is exist
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="showAlert = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-list>
</template>

<script>
import {
  getDomains,
  getWorkspaces,
  getTitleUrl,
  getSlashTag,
  checkSlashTag,
  createNewLink,
  updateLink,
  getLink,
} from '@/services/api';
import { handle } from '@/utils/promise';
export default {
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: '',
    },
  },
  async fetch() {
    if (this.edit) {
      const [resLink, linkError] = await handle(getLink(this.token, this.id));
      if (linkError) throw new Error('Could not fetch delete link');
      const { status, data } = resLink.data;
      if (status === 200) {
        const { title, destination, domain, slashtag, domainID } = data;
        this.form.destinationUrl = destination;
        this.form.title = title;
        this.form.slashTag = slashtag;
        this.form.domain = domain.name;
        this.form.domainId = domainID;
      }
    }
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
    checkSlash: false,
    form: {
      destinationUrl: '',
      title: '',
      slashTag: '',
      domain: 'Domain',
      workspace: '',
      domainId: '',
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
    async validURL(str) {
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
      this.loading = true;
      if (this.valid) {
        await Promise.all([this.getTitle(str), this.getSlashTag(str)]);
        this.loading = false;
      }
      return this.valid;
    },
    async getTitle(url) {
      const [resTitle, titleError] = await handle(getTitleUrl(url));
      if (titleError) throw new Error('Could not fetch title details');
      const { title } = resTitle.data.data;
      this.form.title = title;
    },
    async getSlashTag(url) {
      const [resSlashTag, slashTagError] = await handle(getSlashTag(url));
      if (slashTagError) throw new Error('Could not fetch slash tag');
      const { data } = resSlashTag.data;
      this.form.slashTag = data;
    },
    async checkSlashTagValid(tag) {
      const [resSlashTag, slashTagError] = await handle(checkSlashTag(tag));
      if (slashTagError) throw new Error('Could not fetch slash tag');
      const { data } = resSlashTag.data;
      this.checkSlash = data.exists;
    },

    async infiniteScroll($state) {
      const { token, pageDomains, pageWorkspaces } = this;
      const [resDomains, domainsError] = await handle(
        getDomains(token, pageDomains, true)
      );
      if (domainsError) throw new Error('Could not fetch doamins details');
      const [resWorkspaces, workspacesError] = await handle(
        getWorkspaces(token, pageWorkspaces)
      );
      if (workspacesError)
        throw new Error('Could not fetch workspaces details');

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
    },
    callAction() {
      if (this.edit) {
        this.updateLink();
      } else {
        this.createNewLink();
      }
    },
    async createNewLink() {
      this.loading = true;
      const { destinationUrl, domain, workspace, title, slashTag } = this.form;
      const [resSlashTag, slashTagError] = await handle(
        checkSlashTag(slashTag)
      );
      if (slashTagError) throw new Error('Could not fetch slashTag details');
      const { data } = resSlashTag.data;
      if (!data.exists) {
        const [resLink, linkError] = await handle(
          createNewLink(
            this.token,
            destinationUrl,
            domain,
            slashTag,
            title,
            workspace
          )
        );
        if (linkError) throw new Error('Could not fetch user link');
        const { status } = resLink.data;
        if (status === 201) {
          this.showAlert = true;
          setTimeout(() => {
            this.$emit('closeModalAddNewLink');
            this.reload();
            this.loading = false;
          }, 2000);
        }
      } else {
        this.showAlert403 = true;
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      }
    },
    async updateLink() {
      this.loading = true;
      const { destinationUrl, title, slashTag, domainId } = this.form;
      const [resUpdateLink, updateLinkError] = await handle(
        updateLink(
          this.token,
          this.id,
          destinationUrl,
          domainId,
          slashTag,
          title
        )
      );
      if (updateLinkError) throw new Error('Could not fetch update link');
      if (!this.checkSlash) {
        const { status } = resUpdateLink.data;
        if (status === 200) {
          this.showAlert = true;
          setTimeout(() => {
            this.$emit('closeModalAddNewLink');
            this.reload();
            this.loading = false;
          }, 2000);
        }
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
