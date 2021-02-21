<template>
  <v-list class="dialog-create-new-link">
    <div class="d-flex justify-space-between px-4">
      <div></div>
      <div class="dialog-icon" @click="$emit('close-modal-add-new-link')">
        <img class="ma-2" src="@/assets/svg/close.svg" alt="close" />
      </div>
    </div>
    <div class="modal-mask">
      <div class="modal-mask__title mb-5">Shorten a new link</div>
      <v-textarea
        v-model.lazy="destinationUrl"
        auto-grow
        label="Destination URL"
        hint="Type or paste a link (URL)"
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
                  v-model="domainId"
                  class="dialog-domain"
                  :items="tempDomains"
                  item-text="name"
                  item-value="id"
                  dense
                  outlined
                  :disabled="loading"
                  item-disabled="isUse"
                  :loading="loadingDomains"
                  single-line
                >
                  <template v-slot:item="data">
                    <nuxt-link
                      v-if="data.item.name === 'addMore'"
                      to="/domains"
                    >
                      <div class="d-flex management-domain align-center">
                        <div
                          class="image-management d-flex align-self-center mr-7"
                        >
                          <img
                            class=""
                            src="@/assets/svg/management.svg"
                            alt="management"
                          />
                          <div class="overlay"></div>
                        </div>
                        <div class="text-management">Management Domains</div>
                      </div>
                    </nuxt-link>
                    <div v-else>{{ data.item.name }}</div>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12" md="6" class="py-0">
                <div class="modal-mask__sub-title">Slash tag</div>
                <v-text-field
                  v-model="slashTag"
                  class="dialog-slash-tag"
                  outlined
                  dense
                  :disabled="loading || edit"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6" class="py-0">
                <div class="modal-mask__sub-title">Workspace belong to</div>
                <v-select
                  v-model="workspaceId"
                  class="dialog-workspace"
                  :items="tempWorkspaces"
                  item-text="name"
                  item-value="id"
                  dense
                  outlined
                  single-line
                  menu-props="auto"
                  :disabled="loading || edit"
                >
                  <template v-slot:item="data">
                    <nuxt-link
                      v-if="data.item.name === 'addMore'"
                      to="/workspaces"
                    >
                      <div class="d-flex management-domain align-center">
                        <div
                          class="image-management d-flex align-self-center mr-7"
                        >
                          <img
                            class=""
                            src="@/assets/svg/management.svg"
                            alt="management"
                          />
                          <div class="overlay"></div>
                        </div>
                        <div class="text-management">Management Workspaces</div>
                      </div>
                    </nuxt-link>
                    <div v-else>{{ data.item.name }}</div>
                  </template>
                </v-select>
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
    <v-dialog
      v-model="openModalDetailLink"
      class="dialog"
      max-width="900"
      :fullscreen="width < 700 ? true : false"
    >
      <DetailLink
        :id="detailId"
        :slashtag="detailSlashtag"
        @close-modal-detail-link="closeModalDetailLink"
      />
    </v-dialog>
    <client-only>
      <infinite-loading
        spinner="waveDots"
        @infinite="infiniteScroll"
      ></infinite-loading>
    </client-only>
    <v-snackbar v-model="showAlert" top color="success" timeout="2000">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          aria-label="close"
          @click="showAlert = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
    <v-snackbar v-model="showAlert403" top color="error" timeout="2000">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          aria-label="close"
          @click="showAlert403 = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
  </v-list>
</template>

<script>
import { debounce } from 'debounce';
import {
  getWorkspaces,
  getTitleUrl,
  getSlashTag,
  checkSlashTag,
  createNewLink,
  updateLink,
  getLink,
  getWorkspacesJoined,
  getDomainsWorkspace,
} from '@/services/api';
export default {
  components: {
    DetailLink: () => import('@/components/links/DetailLinkModal'),
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
        const { status } = error.response;
        if (status === 401) {
          this.$router.push('/login');
          window.localStorage.clear();
        }
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
    loadingDomains: false,
    showAlert: false,
    showAlert403: false,
    valid: false,
    checkSlash: false,
    checkSlashEdit: false,
    destinationUrl: '',
    title: '',
    slashTag: '',
    workspaceId: '',
    domainId: '',
    message: '',
    // detail link
    detailId: '',
    detailSlashtag: '',
    openModalDetailLink: false,
    width: 0,
  }),
  computed: {
    tempDomains() {
      let temp = this.domains.map((x) => {
        return {
          id: x.id,
          name: x.name,
          isUse: !x.dnsVerified,
        };
      });
      temp = temp.concat({
        id: 1,
        name: 'addMore',
        isUse: false,
      });
      return temp;
    },
    tempWorkspaces() {
      let temp = this.workspaces.map((x) => {
        return {
          id: x.id,
          name: x.name,
        };
      });
      temp = temp.concat({
        id: 1,
        name: 'addMore',
      });
      return temp;
    },
  },
  watch: {
    slashTag(newVal, oldVal) {
      if (newVal !== this.checkSlashEdit) {
        this.checkSlashTagValid(newVal);
      }
    },
    workspaceId(newVal, oldVal) {
      this.loadDomains();
    },
  },
  created() {
    if (typeof localStorage !== 'undefined' && localStorage.token) {
      this.token = localStorage.token;
    }
    if (this.$route.params.id) {
      this.workspaceId = this.$route.params.id;
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      if (process.client) {
        this.width = window.innerWidth;
      }
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
      if (!str.includes('http') && !str.includes('https')) {
        str = 'http://' + str;
        this.destinationUrl = str;
      }
      if (this.valid && !this.edit && this.domainId !== '') {
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
        const { status } = error.response;
        if (status === 401) {
          this.$router.push('/login');
          window.localStorage.clear();
        }
      }
    },
    async getSlashTag(url) {
      try {
        const resSlashTag = await getSlashTag(url, this.domainId);
        const { data } = resSlashTag.data;
        this.slashTag = data;
      } catch (error) {
        const { status } = error.response;
        if (status === 401) {
          this.$router.push('/login');
          window.localStorage.clear();
        }
      }
    },
    async checkSlashTagValid(tag) {
      if (this.domainId !== '') {
        try {
          const resSlashTag = await checkSlashTag(tag, this.domainId);
          const { data } = resSlashTag.data;
          this.checkSlash = data.exists;
        } catch (error) {
          const { status, data } = error.response;
          this.message = data.message;
          if (status === 401) {
            this.$router.push('/login');
            window.localStorage.clear();
          }
        }
      }
    },
    async loadDomains() {
      this.domains = [];
      const { workspaceId, token } = this;
      try {
        this.loadingDomains = true;
        const res = await getDomainsWorkspace(token, workspaceId, 1, true);
        const { domains = [], totalPage = 1 } = res.data.data;
        this.domains = domains;
        for (let i = 2; i <= totalPage; i++) {
          const res = await getDomainsWorkspace(token, workspaceId, i, true);
          const { domains = [] } = res.data.data;
          this.domains = this.domains.concat(domains);
        }
        if (!this.domainId) {
          const cookieDomainId = this.$cookies.get('userDomain');
          this.domainId = this.domains[0].id;
          if (
            cookieDomainId &&
            this.domains.some((dm) => dm.id === cookieDomainId)
          ) {
            this.domainId = cookieDomainId;
          }
        }
        this.loadingDomains = false;
      } catch (error) {
        const { status } = error.response;
        if (status === 401) {
          this.$router.push('/login');
          window.localStorage.clear();
        }
      }
    },
    async infiniteScroll($state) {
      const { token, pageWorkspaces } = this;
      try {
        const resWorkspaces = await getWorkspaces(token, pageWorkspaces);
        const resWorkspacesJoined = await getWorkspacesJoined(
          token,
          pageWorkspaces
        );

        const statusWorkspaces = resWorkspaces.data.status;
        const statusWorkspacesJoined = resWorkspacesJoined.data.status;

        if (statusWorkspaces === 200) {
          this.pageWorkspaces += 1;
          const { workspaces } = resWorkspaces.data.data;
          if (workspaces.length) {
            this.workspaces.push(...workspaces);
            if (this.$route.params && this.$route.query.name) {
              const name = this.$route.query.name;
              const id = this.$route.params.id;
              this.workspace = {
                name,
                id,
              };
            } else if (this.$cookies.get('userWorkspace') !== null) {
              this.workspaceId = this.$cookies.get('userWorkspace');
            } else {
              this.workspaceId = this.workspaces[0].id;
            }
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
        const { status } = error.response;
        if (status === 401) {
          this.$router.push('/login');
          window.localStorage.clear();
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
      const { destinationUrl, domainId, workspaceId, title, slashTag } = this;
      await this.checkSlashTagValid(slashTag);
      if (!this.checkSlash && destinationUrl !== '') {
        try {
          const resLink = await createNewLink(
            this.token,
            destinationUrl,
            domainId,
            slashTag,
            title,
            workspaceId
          );
          this.$cookies.set('userDomain', domainId, 60 * 60 * 24 * 30);
          this.$cookies.set('userWorkspace', workspaceId, 60 * 60 * 24 * 30);
          const { message, data } = resLink.data;
          this.message = message;
          this.showAlert = true;
          this.destinationUrl = '';
          this.valid = false;
          this.detailId = data.id;
          this.detailSlashtag = data.slashtag;
          this.$emit('close-modal-add-new-link');
          this.$emit('refetchLinks');
          this.loading = false;
          this.openModalDetailLink = true;
        } catch (error) {
          const { status, data } = error.response;
          if (status === 401) {
            this.$router.push('/login');
            window.localStorage.clear();
            return;
          }
          this.message = data.message;
          this.showAlert403 = true;
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        }
      } else {
        this.message = 'Slash tag is existed';
        this.showAlert403 = true;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    },
    async updateLink() {
      this.loading = true;
      const { destinationUrl, title, slashTag, domainId } = this;
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
          this.$emit('closeModalEditNewLink');
          this.loading = false;
        }
      } catch (error) {
        const { status, data } = error.response;
        this.message = data.message;
        this.showAlert403 = true;
        if (status === 401) {
          this.$router.push('/login');
          window.localStorage.clear();
        }
      }
    },
    closeModalDetailLink() {
      this.openModalDetailLink = false;
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
