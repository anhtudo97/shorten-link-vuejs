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
                  v-model="form.domain.id"
                  class="dialog-domain"
                  :items="tempDomains"
                  item-text="name"
                  item-value="id"
                  dense
                  outlined
                  :label="form.domain.name"
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
                  v-model="form.workspace.id"
                  class="dialog-workspace"
                  :items="tempWorkspaces"
                  item-text="name"
                  :label="form.workspace.name"
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
              >
                {{ edit ? 'Update Link' : 'Create link' }}
              </div>
            </div>
          </div>
          <div v-else class="d-flex justify-center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
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
    <SnackbarSuccess
      :message="
        edit ? 'Update link successfully' : 'Create new link successfully'
      "
      :show-alert="showAlert"
      @closeSnackbar="showAlert = false"
    />
    <SnackbarError
      :message="
        domainCheck
          ? 'The workspace has no permission this domain'
          : 'Slash tag is exist'
      "
      :show-alert="showAlert403"
      @closeSnackbar="showAlert403 = false"
    />
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
import SnackbarSuccess from '@/components/shares/SnackbarSuccess';
import SnackbarError from '@/components/shares/SnackbarError';
export default {
  components: {
    SnackbarSuccess,
    SnackbarError,
  },
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
      if (linkError) throw new Error('Could not fetch link');
      const { status, data } = resLink.data;
      if (status === 200) {
        const { title, destination, domain, slashtag, domainID } = data;
        this.form.destinationUrl = destination;
        this.form.title = title;
        this.form.slashTag = slashtag;
        this.form.domain = domain;
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
    domainCheck: false,
    form: {
      destinationUrl: '',
      title: '',
      slashTag: '',
      domain: {
        name: 'Domain',
        id: '',
      },
      workspace: { name: 'Workspace', id: '' },
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
      if (this.valid) {
        this.loading = true;
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
          this.form.domain.name = this.domains[0].name;
          this.form.domain.id = this.domains[0].id;
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
          this.form.workspace.name = this.workspaces[0].name;
          this.form.workspace.id = this.workspaces[0].id;
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
        try {
          const resLink = await createNewLink(
            this.token,
            destinationUrl,
            domain.id,
            slashTag,
            title,
            workspace.id
          );
          const { status } = resLink.data;
          if (status === 201) {
            this.showAlert = true;
            setTimeout(() => {
              this.$emit('closeModalAddNewLink');
              this.loading = false;
            }, 2000);
          }
        } catch (error) {
          this.showAlert403 = true;
          this.domainCheck = true;
          setTimeout(() => {
            this.loading = false;
          }, 2000);
        }
      } else {
        this.showAlert403 = true;
        this.domainCheck = false;
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
