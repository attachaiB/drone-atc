<template lang="html">
  <v-container grid-list-xl text-xs-center id="#regis_con">
    <v-layout row wrap>
      <v-flex xs8 offset-xs1>
        <v-card>
          <form>
            <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            label="Name"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
            ></v-text-field>
            <v-text-field
            v-model="surname"
            :error-messages="surnameErrors"
            label="Surname"
            required
            @input="$v.surname.$touch()"
            @blur="$v.surname.$touch()"
            ></v-text-field>
            <v-text-field
            v-model="person"
            :error-messages="personErrors"
            label="เลขบัตรประจำตัวประชาชน"
            required
            @input="$v.person.$touch()"
            @blur="$v.person.$touch()"
            max="13"
            ></v-text-field>
            <v-text-field
            v-model="username"
            :error-messages="usernameErrors"
            label="Username"
            required
            hint="อย่างน้อย 8 ตัวอักษร และต้องมีตัวพิมพ์เล็กและตัวพิมพ์ใหญ่"
            min="8"
            @input="$v.username.$touch()"
            @blur="$v.username.$touch()"
            ></v-text-field>
            <v-text-field
            v-model="password"
            :error-messages="passwordErrors"
            :append-icon="e1 ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (e1 = !e1)"
            :type="e1 ? 'password' : 'text'"
            label="Password"
            hint="At least 8 characters"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
            ></v-text-field>
            <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            ></v-text-field>
            <v-text-field
            v-model="phone"
            :error-messages="phoneErrors"
            label="Telephone"
            max="10"
            required
            @input="$v.phone.$touch()"
            @blur="$v.phone.$touch()"
            ></v-text-field>
            <v-text-field
            v-model="comreg"
            :error-messages="comregErrors"
            label="รหัสผลิตภัณฑ์"
            required
            @input="$v.comreg.$touch()"
            @blur="$v.comreg.$touch()"
            ></v-text-field>
            <v-text-field
            v-model="company"
            :error-messages="companyErrors"
            label="Company name"
            required
            @input="$v.company.$touch()"
            @blur="$v.company.$touch()"
            ></v-text-field>
            <v-checkbox
            v-model="checkbox"
            :error-messages="checkboxErrors"
            label="ยอมรับข้อตกลง"
            required
            @change="$v.checkbox.$touch()"
            @blur="$v.checkbox.$touch()"
            ></v-checkbox>

            <v-btn @click="submit">submit</v-btn>
            <v-btn @click="clear">clear</v-btn>
          </form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email, minLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    name: { required },
    surname: { required },
    person: { required, maxLength: maxLength(13) },
    username: { required, minLength: minLength(8) },
    password: { required, minLength: minLength(8) },
    email: { required, email },
    phone: { required, maxLength: maxLength(10) },
    comreg: { required },
    company: { required },
    checkbox: { required }
  },

  data: () => {
    return {
      e1: true,
      name: '',
      surname: '',
      person: '',
      username: '',
      password: '',
      email: '',
      phone: '',
      comreg: '',
      company: '',
      checkbox: false
    }
  },

  computed: {
    checkboxErrors () {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.required && errors.push('You must agree to continue!')
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    surnameErrors () {
      const errors = []
      if (!this.$v.surname.$dirty) return errors
      !this.$v.surname.required && errors.push('Surname is required.')
      return errors
    },
    personErrors () {
      const errors = []
      if (!this.$v.person.$dirty) return errors
      !this.$v.person.maxLength && errors.push('ต้องมีความยาว 13 ตัว')
      !this.$v.person.required && errors.push('กรุณากรอกเลขบัตรประจำตัวประชาชน')
      return errors
    },
    usernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.minLength && errors.push('ต้องมีความยาวอย่างน้อย 8 ตัว')
      !this.$v.username.required && errors.push('Username is required.')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('ต้องมีความยาวอย่างน้อย 8 ตัว')
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    phoneErrors () {
      const errors = []
      if (!this.$v.phone.$dirty) return errors
      !this.$v.phone.maxLength && errors.push('หมายเลขโทรศัพท์ห้ามเกิน 10 ตัว')
      !this.$v.phone.required && errors.push('Telephone is required.')
      return errors
    },
    comregErrors () {
      const errors = []
      if (!this.$v.comreg.$dirty) return errors
      !this.$v.comreg.required && errors.push('รหัสผลิตภัณฑ์ is required.')
      return errors
    },
    companyErrors () {
      const errors = []
      if (!this.$v.company.$dirty) return errors
      !this.$v.company.required && errors.push('company is required.')
      return errors
    }
  },

  methods: {
    submit () {
      this.$v.$touch()
      this.$swal('สำเร็จ !', 'ทำรายการสำเร็จ', 'success')
      var data = {
        'name': this.name,
        'surname': this.surname,
        'person': this.person,
        'username': this.username,
        'password': this.password,
        'email': this.email,
        'phone': this.phone,
        'comreg': this.comreg,
        'company': this.company
      }
      this.axios.post('http://127.0.0.1:5000' + '/regis', data).then((response) => {
        var result = response.data
        if (response.status === 200) {
          if (result.status === 'success') {
            window.location = '/login'
          } else {
            this.$swal('ผิดพลาด !', 'ทำรายการผิดพลาด', 'error')
          }
        }
      })
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.surname = ''
      this.person = ''
      this.username = ''
      this.password = ''
      this.email = ''
      this.comreg = ''
      this.company = ''
      this.checkbox = false
      this.phone = ''
    }
  }
}
</script>

<style lang="css">
#regis_con{
  margin-top: 10px;
}
</style>
