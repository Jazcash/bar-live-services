<template>
    <div :class="`filter ${isEnabled ? 'enabled' : 'disabled'}`">
        <div class="name" @click="isEnabled = !isEnabled">
            <slot name="title" />
        </div>
        <div class="options" @click="isEnabled = true">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { cloneDeep } from "lodash";

@Component({
    watch: {
        isEnabled: function(this: OptionsComponent) {
            this.$emit("input", this.isEnabled ? this.selectedValue : undefined);
        }
    }
})
export default class OptionsComponent extends Vue {
    @Prop({ required: false, default: undefined }) readonly value!: any;
    @Prop({ type: Boolean, required: false, default: true }) readonly required!: boolean;
    @Prop({ type: Boolean, required: false, default: true }) readonly enabled!: boolean;

    selectedValue: any = this.enabled && this.value;
    isEnabled: boolean = this.enabled;

    beforeMount() {
        this.selectedValue = typeof this.value === "object" ? cloneDeep(this.value) : this.value;
        if (!this.isEnabled) {
            this.selectedValue = this.value;
        }

        this.$on("optionSelected", (value: any) => {
            this.isEnabled = true;
            this.selectedValue = value;

            this.$emit("input", this.selectedValue);
        });
    }
}
</script>

<style lang="scss" scoped>
.options {
    display: flex;
    flex-direction: row;
}
</style>
