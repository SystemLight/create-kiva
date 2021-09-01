<script>
import {defineComponent} from "vue";

export default defineComponent({
    created() {
        const {params, query} = this.$route;
        const {path} = params;
        this.$router.replace({path: "/" + path, query});
    },
    render: function(h) {
        // avoid warning message
        return h();
    }
});
</script>
