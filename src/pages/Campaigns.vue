<template lang="pug">
  ListLayout
    template(slot="title") Campañas

    template(slot="columns")
      th.crud__title Nombre
      th.crud__title Slug
    template(
      v-for="campaign in campaigns"
      :slot="'row-' + campaign.id")
      td.crud__cell
        a(:href="campaign.link") {{ campaign.name }}
      td.crud__cell
        a(:href="campaign.link") {{ campaign.slug }}
</template>

<script>
import campaignAPI from '@/api/campaign'
import ListMixin from '@/mixins/ListMixin'
import EditCampaign from '@/components/EditCampaign'

export default {
  name: 'Campaigns',
  mixins: [ListMixin],
  data () {
    return {
      query: false,
      slide: EditCampaign,

      objectsKey: 'rawCampaigns',
      loaderMethod: campaignAPI.get,

      rawCampaigns: [],

      canCreate: true
    }
  },
  computed: {
    campaigns () {
      return this.rawCampaigns.map(campaign => {
        campaign.link = this.$store.state.frontUrl + '/shop/campanas/' + campaign.slug
        return campaign
      })
    }
  },
  methods: {
    objectsChanged () {
      this.$store.dispatch('ui/loadCampaigns')
    }
  }
}
</script>
