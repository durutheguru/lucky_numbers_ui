<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '../components/HelloWorld.vue';
import WithRender from './templates/home.html';
import axios from 'axios';


export interface Partner {

    name: string;

}


@WithRender
@Component({
    components: {
        HelloWorld,
    },
})
export default class Home extends Vue {

    public partners: Partner[] = [];

    private async created() {
        const response = await axios.get('/api/v1/partner');
        this.partners = await response.data.content;
    }

}
</script>
