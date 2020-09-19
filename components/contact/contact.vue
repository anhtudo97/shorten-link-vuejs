<template>
  <v-row class="contact">
    <v-col cols="11" md="8" class="mx-auto py-7 py-md-16">
      <v-row class="mb-4">
        <v-col cols="12" md="8" class="mx-auto">
          <div class="contact__main-title">Get In Touch With Us</div>
          <div
            class="contact__quotes"
          >Lorem ipsum dolor, sit amet consectet et adipis icing elit. Ab commodi iure minus laboriosam placeat quia, dolorem animi. Eveniet repudiandae, iure et.</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <div class="contact__info">
            <div class="info-title">We Are Here For You</div>
            <div
              class="info-quote"
            >For more information or inquiry about our products, projects and pricing please feel free to get in touch with us.</div>
            <div class="info-content">
              <img src="@/assets/svg/address.svg" alt="address" />
              <div class="content">
                <strong>Address:</strong>
                <span>226 Nguyen Dang Dao, Dai Phuc, Bac Ninh City, Viet Nam</span>
              </div>
            </div>
            <div class="info-content">
              <img src="@/assets/svg/phone.svg" alt="address" />
              <div class="content">
                <strong>Phone:</strong>
                <span>+123 45 67 88 , +123 45 67 89</span>
              </div>
            </div>
            <div class="info-content">
              <img src="@/assets/svg/mail.svg" alt="address" />
              <div class="content">
                <strong>Email:</strong>
                example@mail.com
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="6" class="contact__map">
          <client-only placeholder="Loading...">
            <iframe
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=Dai%20phuc%20Bac%20Ninh%20&t=&z=13&ie=UTF8&iwloc=&output=embed"
              allowfullscreen
              frameborder="0"
            ></iframe>
          </client-only>
        </v-col>
      </v-row>
    </v-col>
    <div class="contact__diviner"></div>
    <v-row class="mb-6 mt-7 mt-md-16">
      <v-col cols="8" md="8" class="mx-auto">
        <div class="contact__main-title">We Want To Here From You</div>
        <v-row>
          <v-col cols="12" md="8" class="py-0 py-md-3">
            <v-text-field class="contact__input-subscription" label="Your email" outlined dense></v-text-field>
          </v-col>
          <v-col cols="12" md="4" class="py-0 py-md-3">
            <button class="button-normal contact__button-subscription" aria-label="Submit">Submit</button>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-row>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.contact {
  font-family: Poppins, sans-serif;
  margin-top: 10vh;
  &__main-title {
    position: relative;
    font-size: 36px;
    margin-bottom: 1rem;
    padding-bottom: 0.6rem;
    font-weight: 600;
    text-align: center;
    &::before {
      content: '';
      background-color: #3f3d56;
      margin: 0 auto;
      bottom: 0;
      height: 2px;
      left: 0;
      position: absolute;
      right: 0;
      width: 80px;
      box-sizing: border-box;
    }
  }
  &__quotes {
    text-align: center;
    line-height: 28px;
    color: #767575;
  }
  &__info {
    .info-title {
      color: #3f3d56;
      line-height: 30px;
      font-size: 20px;
      margin-bottom: 10px;
      text-transform: capitalize;
      font-weight: 600;
    }
    .info-quote {
      color: #767575;
      font-size: 16px;
      line-height: 25px;
    }
    .info-content {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-gap: 15px;
      margin: 15px 0;
      max-width: 500px;
      img {
        object-fit: cover;
        width: 20px;
        height: auto;
      }
      .content {
        color: #767575;
        line-height: 25px;
        font-size: 16px;
      }
    }
  }
  &__map {
    iframe {
      width: 100%;
      height: 100%;
    }
  }
  &__diviner {
    width: 100%;
    height: 1px;
    background-color: #e8e9ea;
  }
  &__input-subscription::v-deep label,
  &__input-subscription::v-deep input {
  }
  &__button-subscription {
    padding: 7px 10vh;
    font-weight: 500;
    text-transform: uppercase;
  }
  @media screen and (max-width: 1368px) {
    &__main-title {
      font-size: 34px;
    }
    &__quotes {
      font-size: 15px;
    }
    &__info {
      .info-title {
        font-size: 18px;
      }
      .info-quote {
        font-size: 15px;
      }
      .info-content {
        img {
          width: 20px;
        }
        .content {
          font-size: 15px;
        }
      }
    }
    &__input-subscription::v-deep label,
    &__input-subscription::v-deep input {
      font-size: 15px;
    }
    &__button-subscription {
      font-size: 15px;
    }
  }
  @media screen and (max-width: 960px) {
    &__main-title {
      font-size: 32px;
    }
    &__quotes {
      font-size: 14px;
    }
    &__info {
      .info-title {
        font-size: 16px;
      }
      .info-quote {
        font-size: 14px;
      }
      .info-content {
        img {
          width: 20px;
        }
        .content {
          font-size: 14px;
        }
      }
    }
    &__map {
      iframe {
        width: 100%;
        height: 100%;
      }
    }
    &__input-subscription::v-deep label,
    &__input-subscription::v-deep input {
      font-size: 14px;
    }
    &__button-subscription {
      width: 100%;
      font-size: 14px;
    }
  }
  @media screen and (max-width: 600px) {
    &__main-title {
      font-size: 30px;
    }
    &__quotes {
      font-size: 13px;
    }
    &__info {
      .info-title {
        font-size: 15px;
      }
      .info-quote {
        font-size: 13px;
      }
      .info-content {
        img {
          width: 20px;
        }
        .content {
          font-size: 13px;
        }
      }
    }
    &__map {
      iframe {
        width: 100%;
        height: 250px;
      }
    }
  }
}
</style>
