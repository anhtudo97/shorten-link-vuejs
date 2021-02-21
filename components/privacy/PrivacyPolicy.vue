<template>
  <v-row>
    <v-col cols="11" md="10" lg="8" class="mx-auto privacy">
      <div class="privacy__title">Relinks Privacy Statement</div>
      <ol class="privacy__sub-content">
        <li class="content-item">
          <div class="sub-content-title">Introduction</div>
          <ul class="sub-content-description list-lower-roman">
            <li class="sub-content-description">
              <p>
                This Privacy Statement provides guidance and information to
                Radiate Capital Limited (“<span class="font-semiblod"
                  >Relinks</span
                >”) customers regarding the processing of personal data by
                Rebrandly.
              </p>
            </li>
            <li class="sub-content-description">
              <p>
                Rebrandly ("<span class="font-semiblod">us</span>",
                "<span>we</span>" or "<span class="font-semiblod">our</span>")
                is committed to protecting and respecting your privacy. This
                Statement together with the Term and Conditions and Cookies
                Policy and the documents referred to in them sets out the basis
                on which any personal data we collect from you or that you
                provide to us (“<span class="font-semiblod">Data</span>”) will
                be processed by us. Please read this Privacy Statement carefully
                to understand our treatment and use of Data.
              </p>
            </li>
            <li class="sub-content-description">
              <p>
                In this Privacy Statement, references to “<span
                  class="font-semiblod"
                  >you</span
                >” means the person whose personal information we collect, use
                and process.
              </p>
            </li>
            <li class="sub-content-description">
              <p>
                We will use your personal data only for the purposes and in the
                manner set forth below, which describes the steps we take to
                ensure the processing of your personal data is in compliance
                with the Data Protection Acts 1988 and 2003 and any subsequent
                data protection and privacy legislation (the “<span
                  class="font-semiblod"
                  >Acts</span
                >”), European Union Law including the General Data Protection
                Regulation (the “<span class="font-semiblod">GDPR</span>”) and
                any subsequent amendments (together the “<span
                  class="font-semiblod"
                  >Data Protection Legislation</span
                >”).
              </p>
            </li>
            <li class="sub-content-description">
              <p>
                If you do not agree with or are not comfortable with any aspect
                of this Privacy Statement, your only remedy is to not become a
                customer of Rebrandly.
              </p>
            </li>
            <li class="sub-content-description">
              <p>
                We seek to maintain the privacy, accuracy, and confidentiality
                of personal information (including your personal data) that we
                collect and use concerning our customers.
              </p>
            </li>
          </ul>
        </li>
        <li class="content-item">
          <div class="sub-content-title">
            Identity of the controller of personal information
          </div>
          <div class="sub-content-description">
            For the purposes of the Data Protection Legislation, the Data
            Controller is Radiate Capital Limited, a private company limited by
            shares and registered in Ireland (Registered Number 567282) and
            having its registered office address at 31 Westland Square, Dublin
          </div>
        </li>
        <li class="content-item">
          <div class="sub-content-title">
            Contact details of the privacy officer
          </div>
          <div class="sub-content-description">
            The data protection officer appointed in respect of your entity (if
            applicable) can be provided – please see clause 13 for further
            contact information.
          </div>
        </li>
        <li class="content-item">
          <div class="sub-content-title">
            When does privacy statement apply
          </div>
          <div class="sub-content-description">
            This Privacy Statement applies to personal information that we
            collect, use and otherwise process about you in connection with your
            relationship with us as a customer or potential customer.
          </div>
        </li>
        <li class="content-item">
          <div class="sub-content-title">
            What personal information is collected and processed?
          </div>
          <ul class="sub-content-description list-lower-roman">
            <li class="sub-content-description">
              <div>
                As data controller, we may collect and process the following
                categories of information about you:
              </div>
              <ul class="list-lower-alpha">
                <li>
                  your personal information (e.g. name, gender, date of birth,
                  address, email and phone number);
                </li>
                <li>your authentication information (e.g. tokens); and</li>
                <li>
                  your financial information (e.g. credit card number and
                  billing data).
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ol>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.privacy {
  font-family: Poppins, sans-serif;
  &__title {
    font-size: 38px;
    margin: 20px 0 15px 0;
  }
  &__sub-content {
    padding-left: 12px;
    .content-item {
      padding: 10px 0;
      .sub-content-title {
        font-size: 18px;
      }
      .sub-content-description {
        font-size: 15px;
        padding-top: 5px;
        list-style-type: lower-roman;
      }
      li {
        padding: 6px 0;
      }
    }
    .list-lower-roman {
      list-style-type: lower-roman;
    }
    .list-lower-alpha {
      list-style-type: lower-alpha;
    }
  }
}
</style>
