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
        v-model.lazy="destinationUrl"
        auto-grow
        label="Destination your URL"
        hint="Type or paste your URL"
        outlined
        dense
        rows="1"
        @input="validURL(destinationUrl)"
      ></v-textarea>
      <transition name="slide-fade">
        <div v-if="valid || edit || loading">
          <div v-if="!loading">
            <v-row>
              <v-col cols="12" md="6" class="py-0">
                <div class="modal-mask__sub-title">Branded domain</div>
                <v-select
                  v-model="domain.id"
                  class="dialog-domain"
                  :items="tempDomains"
                  item-text="name"
                  item-value="id"
                  dense
                  outlined
                  :label="domain.name"
                  :disabled="loading"
                  item-disabled="isUse"
                />
              </v-col>
              <v-col cols="12" md="6" class="py-0">
                <div class="modal-mask__sub-title">Slash tag</div>
                <v-text-field
                  v-model="slashTag"
                  class="dialog-slash-tag"
                  outlined
                  dense
                  :disabled="loading"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6" class="py-0">
                <div class="modal-mask__sub-title">Workspace belong to</div>
                <v-select
                  v-model="workspace.id"
                  class="dialog-workspace"
                  :items="tempWorkspaces"
                  item-text="name"
                  :label="workspace.name"
                  item-value="id"
                  dense
                  outlined
                  menu-props="auto"
                  :disabled="loading || edit"
                />
              </v-col>
              <v-col cols="12" md="6" class="py-0">
                <div class="modal-mask__sub-title">Web title</div>
                <v-text-field
                  v-model="title"
                  class="dialog-web-title"
                  placeholder="Web title"
                  outlined
                  dense
                  :disabled="loading"
                />
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
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="showAlert = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="showAlert403" top color="error">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="showAlert403 = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-list>
</template>

<script>
import { debounce } from 'debounce';
import {
  getDomains,
  getWorkspaces,
  getTitleUrl,
  getSlashTag,
  checkSlashTag,
  createNewLink,
  updateLink,
  getLink,
  getWorkspacesJoined,
} from '@/services/api';
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
      try {
        const resLink = await getLink(this.token, this.id);
        const { status, data } = resLink.data;
        if (status === 200) {
          const { title, destination, domain, slashtag, domainID } = data;
          this.destinationUrl = destination;
          this.title = title;
          this.slashTag = slashtag;
          this.checkSlashEdit = slashtag;
          this.domain = domain;
          this.domainId = domainID;
        }
      } catch (error) {
        const { status } = error.response.data;
        if (status === 401) this.$router.push('/login');
      }
    }
  },
  data: () => ({
    // domains
    domains: [],
    pageDomains: 1,
    // workspaces
    workspaces: [],
    pageWorkspaces: 1,
    // workspaces joined
    workspacesJoined: [],
    pageWorkspacesJoined: 1,
    token: '',
    loading: false,
    showAlert: false,
    showAlert403: false,
    valid: false,
    checkSlash: false,
    checkSlashEdit: false,
    destinationUrl: '',
    title: '',
    slashTag: '',
    domain: {
      name: 'Domain',
      id: '',
    },
    workspace: { name: 'Workspace', id: '' },
    domainId: '',
    message: '',
  }),
  computed: {
    tempDomains() {
      return this.domains.map((x) => {
        return {
          id: x.id,
          name: x.name,
          isUse: !x.dnsVerified,
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
  watch: {
    slashTag(newVal, oldVal) {
      if (newVal !== this.checkSlashEdit) {
        this.checkSlashTagValid(newVal);
      }
    },
  },
  created() {
    if (typeof localStorage !== 'undefined' && localStorage.token) {
      this.token = localStorage.token;
    }
  },
  methods: {
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
      if (!str.includes('http') || !str.includes('https'))
        str = 'https://' + str;
      if (this.valid) {
        this.loading = true;
        await Promise.all([this.getTitle(str), this.getSlashTag(str)]);
        this.loading = false;
      }
      return this.valid;
    }, 1000),
    async getTitle(url) {
      try {
        const resTitle = await getTitleUrl(url);
        const { title } = resTitle.data.data;
        this.title = title;
      } catch (error) {
        const { status } = error.response.data;
        if (status === 401) this.$router.push('/login');
      }
    },
    async getSlashTag(url) {
      try {
        const resSlashTag = await getSlashTag(url);
        const { data } = resSlashTag.data;
        this.slashTag = data;
      } catch (error) {
        const { status } = error.response.data;
        if (status === 401) this.$router.push('/login');
      }
    },
    async checkSlashTagValid(tag) {
      try {
        const resSlashTag = await checkSlashTag(tag);
        const { data } = resSlashTag.data;
        this.checkSlash = data.exists;
      } catch (error) {
        const { status } = error.response.data;
        if (status === 401) this.$router.push('/login');
      }
    },
    async infiniteScroll($state) {
      const { token, pageDomains, pageWorkspaces } = this;
      try {
        const resDomains = await getDomains(token, pageDomains, true);
        const resWorkspaces = await getWorkspaces(token, pageWorkspaces);
        const resWorkspacesJoined = await getWorkspacesJoined(
          token,
          pageWorkspaces
        );

        const statusDomains = resDomains.data.status;
        const statusWorkspaces = resWorkspaces.data.status;
        const statusWorkspacesJoined = resWorkspacesJoined.data.status;

        if (statusDomains === 200) {
          this.pageDomains += 1;
          const { domains } = resDomains.data.data;
          if (domains.length) {
            this.domains.push(...domains);
            this.domain.name = this.domains[0].name;
            this.domain.id = this.domains[0].id;
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
            this.workspace.name = this.workspaces[0].name;
            this.workspace.id = this.workspaces[0].id;
            $state.loaded();
          } else {
            $state.complete();
          }
        }
        if (statusWorkspacesJoined === 200) {
          this.pageWorkspacesJoined += 1;
          const { invitations } = resWorkspacesJoined.data.data;
          if (invitations.length) {
            const workspaces = invitations.map((x) => x.workspace);
            this.workspaces.push(...workspaces);
            $state.loaded();
          } else {
            $state.complete();
          }
        }
      } catch (error) {
        const { status } = error.response.data;
        if (status === 401) this.$router.push('/login');
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
      const { destinationUrl, domain, workspace, title, slashTag } = this;
      await this.checkSlashTagValid(slashTag);
      if (!this.checkSlash && destinationUrl !== '') {
        try {
          const resLink = await createNewLink(
            this.token,
            destinationUrl,
            domain.id,
            slashTag,
            title,
            workspace.id
          );
          const { status, message } = resLink.data;
          this.message = message;
          if (status === 201) {
            this.showAlert = true;
            setTimeout(() => {
              this.destinationUrl = '';
              this.valid = false;
              this.$emit('closeModalAddNewLink');
              this.loading = false;
            }, 1000);
          }
        } catch (error) {
          const { status, message } = error.response.data;
          if (status === 401) {
            this.$router.push('/login');
            return;
          }
          this.message = message;
          this.showAlert403 = true;
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        }
      } else {
        this.showAlert403 = true;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    },
    async updateLink() {
      this.loading = true;
      const { destinationUrl, title, slashTag, domainId } = this;
      if (!this.checkSlash) {
        try {
          const resUpdateLink = await updateLink(
            this.token,
            this.id,
            destinationUrl,
            domainId,
            slashTag,
            title
          );
          const { status, message } = resUpdateLink.data;
          this.message = message;
          if (status === 200) {
            this.showAlert = true;
            setTimeout(() => {
              this.showAlert = false;
              this.$emit('closeModalEditNewLink');
              this.loading = false;
            }, 1000);
          }
        } catch (error) {
          const { status, message } = error.response.data;
          this.message = message;
          if (status === 401) {
            this.$router.push('/login');
          }
        }
      } else {
        this.showAlert403 = true;
        setTimeout(() => {
          this.showAlert403 = false;
          this.loading = false;
        }, 2000);
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
