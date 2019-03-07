<template>
    <div>
      <v-container fluid grid-list-xl class="pb-0">
        <v-toolbar flat class="transparent section-definition-toolbar mb-3">
          <v-avatar class="box-glow" tile>
            <v-icon dark>message</v-icon>
          </v-avatar>
          <v-toolbar-title class="primary--text hidden-xs-only">{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            label="Search User"
            solo
            append-icon="search"
            class="max-width-300x"
          ></v-text-field>
          <!-- <v-list dense class="text-xs-right max-width-250x">
            <v-list-tile>
              <v-list-tile-avatar>
                <v-avatar
                  size="40px"
                  color="grey lighten-4"
                  class="ml-2"
                >
                  <img :src="authUser.avatar" alt="avatar">
                </v-avatar>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="authUser.name" class="subheading"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list> -->
        </v-toolbar>
        <v-navigation-drawer
          hide-overlay
          v-model="drawerinternal"
          :permanent="$vuetify.breakpoint.mdAndUp"
          enable-resize-watcher
          :mini-variant="$vuetify.breakpoint.smAndDown"
          :temporary="$vuetify.breakpoint.smAndDown"
          class="contact-nav-drawer"
          floating
        >
          <v-toolbar flat class="transparent">
            <v-list class="pa-0">
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img :src="authUser.avatar" />
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{authUser.name}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-toolbar>
          <v-divider></v-divider>
          <v-list class="pt-0 inner-sidebar v-menu-trans-list-npd">
            <template v-for="(item, index) in menuItems">
              <v-list-tile
                @click="activeMenu = item.slug"
                class="border-radius6"
                :class="[item.slug === activeMenu ? 'box-glow' : '']"
                :key="`${index}-menuitems`"
              >
                <v-list-tile-avatar>
                  <v-avatar size="40">
                    <span>{{ item.title | first2Char }}</span>
                  </v-avatar>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-navigation-drawer>
        <!-- Messaging Section -->
        <v-layout row  class="contact-section">
          <v-flex xs12 pr-0 pt-0 v-bind:pl-0="$vuetify.breakpoint.smAndDown">
            <v-card>
              <v-toolbar card>
                <v-toolbar-side-icon @click.stop="drawerinternal = !drawerinternal" class="hidden-md-and-up"></v-toolbar-side-icon>
                <v-menu offset-y>
                  <v-btn small slot="activator" class="box-glow">
                    {{ showBulkActionOptions ? 'Selected' : 'Select' }} <v-icon right>arrow_drop_down</v-icon>
                  </v-btn>
                  <v-list class="v-menu-list">
                    <v-list-tile @click="selectAll">
                      <v-list-tile-title>Select All</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click="unselectAll">
                      <v-list-tile-title>Unselect All</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-btn icon @click="contacts = unselectedContacts" :disabled="!showBulkActionOptions">
                  <v-icon color="error">delete</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  class="box-glow"
                  dark
                  small
                  right
                  icon
                  @click="contactDialog = !contactDialog"
                >
                  <v-icon>add</v-icon>
                </v-btn>
              </v-toolbar>
              <v-divider></v-divider>
              <v-card-text class="pa-0 contact-list-section">
                <div>
                  <v-list two-line class="v-menu-trans-list-npd">
                    <template v-for="(item, index) in listContact">
                      <v-list-tile @click="editContact(item)" :key="`${index}-listcontact`">
                        <v-list-tile-action @click.stop>
                          <v-checkbox
                            color="sidebar"
                            hide-details
                            v-model="item.selected"
                          ></v-checkbox>
                        </v-list-tile-action>

                        <v-list-tile-avatar>
                          <img v-bind:src="item.avatar"/>
                        </v-list-tile-avatar>

                        <v-list-tile-content @click="editContact(item)">
                          <v-list-tile-title class="ma-0">{{ item.first }} {{ item.last }}</v-list-tile-title>
                          <!-- <v-list-tile-sub-title class="ma-0 menu-list-hover-text hidden-sm-and-up">{{ item.email }}</v-list-tile-sub-title> -->
                        </v-list-tile-content>

                        <v-list-tile-content @click="() => {}" class="hidden-sm-and-down">
                          <v-list-tile-title>{{ item.email }}</v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-content @click="() => {}" class="hidden-md-and-down">
                          <v-list-tile-title>{{ item.phone }}</v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-action
                          @click.stop="item.is_favourite = !item.is_favourite"
                          class="compact-action"
                        >
                          <v-icon
                            :color="item.is_favourite ? 'amber' : ''"
                          >
                            {{ item.is_favourite ? 'star' : 'star_border' }}
                          </v-icon>
                        </v-list-tile-action>
                        <v-list-tile-action class="compact-action" @click.stop>
                          <v-menu offset-y>
                            <v-btn icon small slot="activator" class="content-ma-0">
                              <v-icon small>more_vert</v-icon>
                            </v-btn>
                            <v-list>
                              <v-list-tile @click="deleteContactDialogHandler(item)">
                                <v-list-tile-title>
                                  <v-icon left>delete</v-icon> Delete
                                </v-list-tile-title>
                              </v-list-tile>
                            </v-list>
                          </v-menu>
                        </v-list-tile-action>
                      </v-list-tile>
                    </template>
                  </v-list>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <!-- Delete Contact confirmbox -->
      <v-dialog v-model="confirmBox.deleteContact" max-width="290">
        <v-card class="confirm-box">
          <v-card-title class="pb-0">
            <span class="margin-auto">Delete Contact ?</span>
          </v-card-title>
          <v-card-text class="text-xs-center py-2">
            Are you sure you want to delete the Contact ?
          </v-card-text>
          <v-card-text class="pa-0">
            <v-layout row wrap>
              <v-flex xs6>
                <v-btn block class="ma-0 cancel" flat @click.stop="resetDialog">Cancel</v-btn>
              </v-flex>
              <v-flex xs6>
                <v-btn block class="ma-0 action" flat @click.stop="remove">Delete</v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- Create Contact Modal -->
      <v-dialog v-model="contactDialog" scrollable persistent max-width="480px">
        <v-card class="create-dialog-card">
          <v-card-title>
            <v-layout>
              <v-flex row xs6>
                <span class="white--text">New Contact</span>
              </v-flex>
              <v-flex row xs6 text-xs-right>
                <v-btn flat icon class="fx-close-model-btn" @click="contactDialog = false">
                  <v-icon color="white">close</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-img height="200px" class="primary">
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex
                  xs12
                  text-xs-center
                  layout
                  align-center
                  justify-center
                >
                  <v-avatar
                    size="125px"
                    class="grey lighten-4"
                  >
                    <img :src="form.avatar" alt="avatar">
                  </v-avatar>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    :error-messages="fieldErrors('form.first')"
                    @input="$v.form.first.$touch()"
                    @blur="$v.form.first.$touch()"
                    prepend-icon="person"
                    label="First Name"
                    v-model="form.first"
                    required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="c"
                    label="Last name"
                    v-model="form.last"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="c"
                    label="Nickname"
                    v-model="form.nickname"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    :error-messages="fieldErrors('form.phone')"
                    @input="$v.form.phone.$touch()"
                    @blur="$v.form.phone.$touch()"
                    prepend-icon="phone"
                    label="Phone"
                    v-model="form.phone"
                    mask="+#### #### #######"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    :error-messages="fieldErrors('form.email')"
                    @input="$v.form.email.$touch()"
                    @blur="$v.form.email.$touch()"
                    prepend-icon="email"
                    v-model="form.email"
                    label="Email"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="domain"
                    label="Company"
                    v-model="form.company"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="work"
                    label="Job"
                    v-model="form.job"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-menu
                    ref="datepicker"
                    :close-on-content-click="false"
                    v-model="datepicker"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="form.formatedBirthday"
                      label="Birthdate"
                      hint="MM/DD/YYYY format"
                      persistent-hint
                      prepend-icon="cake"
                      @blur="form.birthdate = parseDate(form.formatedBirthday)"
                    ></v-text-field>
                    <v-date-picker v-model="form.birthdate" no-title @input="datepicker = false"></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="home"
                    label="Address"
                    v-model="form.address"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="white--text" color="menuhover" @click.native="resetContactForm()">Close</v-btn>
            <v-btn class="white--text" color="act" @click.native="updateContact()" :disabled="$v.form.$invalid" v-if="isEditformMod">Edit</v-btn>
            <v-btn class="white--text" color="act" @click.native="createNewContact()" :disabled="$v.form.$invalid" v-else>Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>
<script>
  import { rgba as Gradients } from '@/data/gradients'
  import { filter, findIndex } from 'lodash'
  import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'
  import { validNumber } from '@/utils/validators'
  import validationMixin from '@/mixins/validationMixin'
  import {defaultUserPic, users, authUser} from '@/data/dummyData'

  export default {
    mixins: [validationMixin],
    validations: {
      form: {
        first: { required },
        email: { email },
        phone: {
          required,
          validNumber,
          maxLength: maxLength(15),
          minLength: minLength(7)
        }
      }
    },
    validationMessages: {
      form: {
        first: { required: 'First name is required' },
        email: {
          email: 'Email must be valid'
        },
        phone: {
          maxLength: 'Max 14 digits',
          minLength: 'Min 7 digits',
          validNumber: 'Phone number must be a valid number'
        }
      }
    },
    data () {
      return {
        title: 'Contacts',
        date: null,
        dateFormatted: null,
        gradient: Gradients[9],
        backgroundImg: '/static/doc-images/vbanner.jpg',
        form: {
          first: '',
          last: '',
          nickname: '',
          phone: '',
          email: '',
          company: '',
          avatar: defaultUserPic,
          job: '',
          birthdate: '',
          formatedBirthday: '',
          address: '',
          notes: null,
          is_favourite: false,
          is_frequent: false,
          selected: false
        },
        search: null,
        drawerinternal: true,
        activeMenu: 'all',
        menuItems: [
          { title: 'All Contacts', isActive: true, slug: 'all' },
          { title: 'Frequently Contacted', isActive: false, slug: 'frequent' },
          { title: 'Favourite Contacts', isActive: false, slug: 'favourite' }
        ],
        authUser,
        contacts: [
          {
            first: users[1].firstname,
            last: users[1].lastname,
            nickname: null,
            email: users[1].email,
            avatar: users[1].avatar,
            phone: '+1202-555-0135',
            company: null,
            job: null,
            birthdate: null,
            address: null,
            notes: null,
            is_favourite: false,
            is_frequent: false,
            selected: false
          },
          {
            first: users[2].firstname,
            last: users[2].lastname,
            nickname: null,
            email: users[2].email,
            avatar: users[2].avatar,
            phone: '+1202-555-0135',
            company: null,
            job: null,
            birthdate: null,
            address: null,
            notes: null,
            is_favourite: true,
            is_frequent: false,
            selected: false
          },
          {
            first: users[3].firstname,
            last: users[3].lastname,
            nickname: null,
            email: users[3].email,
            avatar: users[3].avatar,
            phone: '+1202-555-0135',
            company: null,
            job: null,
            birthdate: null,
            address: null,
            notes: null,
            is_favourite: true,
            is_frequent: true,
            selected: false
          },
          {
            first: users[4].firstname,
            last: users[4].lastname,
            nickname: null,
            email: users[4].email,
            avatar: users[4].avatar,
            phone: '+1202-555-0135',
            company: null,
            job: null,
            birthdate: null,
            address: null,
            notes: null,
            is_favourite: true,
            is_frequent: true,
            selected: false
          },
          {
            first: users[5].firstname,
            last: users[5].lastname,
            nickname: null,
            email: users[5].email,
            avatar: users[5].avatar,
            phone: '+1202-555-0135',
            company: null,
            job: null,
            birthdate: null,
            address: null,
            notes: null,
            is_favourite: true,
            is_frequent: true,
            selected: false
          }
        ],
        confirmBox: {
          deleteContact: false,
          item: null
        },
        contactDialog: false,
        isEditformMod: false,
        editIndex: null,
        datepicker: false
      }
    },
    methods: {
      selectAll () {
        if (this.unselectedContacts) {
          this.unselectedContacts.forEach((element) => {
            element.selected = true
          })
        }
      },
      unselectAll () {
        if (this.selectedContacts) {
          this.selectedContacts.forEach((element) => {
            element.selected = false
          })
        }
      },
      toggleFavourite (item) {
        item.is_favourite = !item.is_favourite
      },
      remove () {
        let index = this.contacts.indexOf(this.confirmBox.item)
        this.contacts.splice(index, 1)
        this.resetDialog()
      },
      resetDialog () {
        this.confirmBox = {
          deleteContact: false,
          item: null
        }
      },
      deleteContactDialogHandler (item) {
        this.confirmBox = {
          deleteContact: true,
          item
        }
      },
      formatDate (date) {
        if (!date) {
          return null
        }

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) {
          return null
        }

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      resetContactForm () {
        this.form = {
          first: '',
          last: '',
          nickname: '',
          phone: '',
          email: '',
          company: '',
          avatar: '/static/default/user.svg',
          job: '',
          birthdate: '',
          formatedBirthday: '',
          address: '',
          notes: null,
          is_favourite: false,
          is_frequent: false,
          selected: false
        }
        this.contactDialog = false
        this.isEditformMod = false
        this.editIndex = null
      },
      editContact (contact) {
        this.form = contact
        this.isEditformMod = true
        this.contactDialog = true
        this.editIndex = findIndex(this.contacts, contact => contact === this.form)
      },
      createNewContact () {
        this.isEditformMod = false
        this.contacts.push(this.form)
        this.resetContactForm()
      },
      updateContact () {
        const index = this.editIndex
        this.contacts[index] = this.form
        this.resetContactForm()
      }
    },
    computed: {
      frequentlyContacted () {
        return filter(this.contacts, (element) => element.is_frequent)
      },
      favouriteContacts () {
        return filter(this.contacts, (element) => element.is_favourite)
      },
      selectedContacts () {
        return filter(this.contacts, (element) => element.selected)
      },
      unselectedContacts () {
        return filter(this.contacts, (element) => !element.selected)
      },
      listContact () {
        let list = this.contacts
        switch (this.activeMenu) {
          case 'frequent':
            list = this.frequentlyContacted
            break

          case 'favourite':
            list = this.favouriteContacts
            break

          default:
            if (this.search) {
              // list = filter(this.contacts, (element) => element.first === this.search || element.last === this.search || element.email === this.search || element.phone === this.search)
              list = this.contacts.filter(contact => {
                return contact.first.toLowerCase().includes(this.search.toLowerCase()) ||
                contact.last.toLowerCase().includes(this.search.toLowerCase()) ||
                contact.email.toLowerCase().includes(this.search.toLowerCase()) ||
                contact.phone.toLowerCase().includes(this.search.toLowerCase())
              })
            } else {
              list = this.contacts
            }
            break
        }
        return list
      },
      showBulkActionOptions () {
        return this.selectedContacts && this.selectedContacts.length > 0
      }
    },
    watch: {
      'form.birthdate' (val) {
        this.form.formatedBirthday = this.formatDate(this.form.birthdate)
      },
      contactDialog (from, to) {
        if (to) {
          this.resetContactForm()
        }
      }
    }
  }
</script>
<style scoped>
  .toobar-extension {
    margin-left: 0 !important;
    min-width: 300px;
  }
</style>
