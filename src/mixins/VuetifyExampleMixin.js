import {has} from 'lodash'
import componentsJson from '@/data/json/components'
import { camel, kebab } from '@/utils/helpers'

export default {
  data () {
    return {
      componentsJson
    }
  },
  computed: {
    computedComponent () {
      return camel(this.component)
    },
    computedComponents () {
      let component = this.componentsJson[this.component]
      // Temporary until all components are converted
      if (component) {
        return component.components
      } else {
        // TODO: move out of translation files
        component = `${this.computedSection}.${this.computedComponent}.components`
      }

      return this.$te(component)
        ? this.$t(component)
        : this.$te(component, 'en')
          ? this.$t(component, 'en')
          : []
    },
    folder () {
      return kebab(this.computedComponent)
    },
    computedSection () {
      return camel(this.section)
    },
    localeMessages () {
      return this._i18n.messages
    },
    locale () {
      return this._i18n.locale
    },
    examples () {
      const component = this.componentsJson[this.component]

      if (!component) return []

      return component.examples.map(example => {
        let file = example
        let newIn = false

        if (example === Object(example)) {
          file = example.file
          newIn = example.newIn
        }

        const namespace = `${this.computedSection}.${this.computedComponent}.examples.${file}`

        return {
          file,
          desc: has(this.localeMessages[this.locale], `${namespace}.desc`) ? this.$t(`${namespace}.desc`) : null,
          header: has(this.localeMessages[this.locale], `${namespace}.header`) ? this.$t(`${namespace}.header`) : null,
          newIn
        }
      })
    },
    exists () {
      return (this.computedComponents || []).length > 0 ||
        (this.examples || []).length > 0
    },
    data () {
      return {
        components: this.computedComponents,
        examples: this.examples,
        folder: kebab(this.computedComponent),
        toc: this.toc,
        namespace: {
          component: this.computedComponent,
          section: this.section
        }
      }
    }
  },
  methods: {
    camelCaseToDash (str) {
      return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
    }
  },
  destroyed () {
    // this.$destroy(true)
  }
}
