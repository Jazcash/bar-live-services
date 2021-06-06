<template>
    <div>
        <h1 class="page-title">
            Balance Changes
        </h1>
        <div class="wrapper">
            <v-pagination v-model="page" :length="pageCount" :total-visible="10" @input="changePage" />
            <div class="balance-changes">
                <div v-for="(change, index1) in balanceChanges" :key="index1" class="balance-change">
                    <div class="meta">
                        <div class="flex-row flex-space-between">
                            <div class="date">
                                {{ $moment(change.date).format("dddd, MMMM Do YYYY") }}
                            </div>
                            <div class="flex-row flex-center">
                                <div class="sha">
                                    <a :href="change.url">{{ change.sha.substr(0, 7) }}</a>
                                </div>
                                <a class="author" :href="change.author.url">
                                    {{ change.author.name }}
                                    <img class="author__avatar" :src="change.author.img">
                                </a>
                            </div>
                        </div>
                        <div>
                            <div v-for="(message, index2) in change.message.split('\n')" :key="index2" class="message">
                                {{ message }}
                            </div>
                        </div>
                    </div>
                    <div class="changes">
                        <PropertyChange v-for="(change2, index) in change.changes" :key="index" :data="change2.unit" :depth="0" />
                    </div>
                </div>
            </div>
            <v-pagination v-model="page" :length="pageCount" :total-visible="10" @input="changePage" />
        </div>
    </div>
</template>

<script lang="ts">
import { Context } from "@nuxt/types/app";
import { BalanceChange } from "bar-db";
import { Component, Vue } from "nuxt-property-decorator";
import { APIResponse } from "~/model/api/api-response";

@Component({
    head: { title: "BAR - Balance Changes" },
    watch: {
        "$route.query": "$fetch"
    }
})
export default class Page extends Vue {
    totalResults = 0;
    page = 1;
    pageCount = 0;
    balanceChanges: BalanceChange[] = [];

    async asyncData({ store, $http, params, query }: Context): Promise<any> {
        const searchParams = new URLSearchParams(query as {});
        const result = await $http.$get("balance-changes", { searchParams }) as APIResponse<BalanceChange[]>;
        return {
            totalResults: result.totalResults,
            page: result.page,
            pageCount: Math.ceil(result.totalResults / result.resultsPerPage),
            balanceChanges: result.data
        };
    }

    async fetch(): Promise<any> {
        const searchParams = new URLSearchParams(this.$route.query as {});
        const result = await this.$http.$get("balance-changes", { searchParams }) as APIResponse<BalanceChange[]>;
        this.totalResults = result.totalResults;
        this.page = result.page;
        this.pageCount = Math.ceil(result.totalResults / result.resultsPerPage);
        this.balanceChanges = result.data;
    }

    async changePage(page: number) {
        this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page: page.toString() } });
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.balance-changes {
    max-width: 800px;
    margin-top: 10px;
}
.balance-change {
    position: relative;
    border-bottom: 5px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    margin-bottom: 20px;
}
.sha {
    margin-right: 10px;
    padding-right: 10px;
    border-right: 1px solid rgba(255, 255, 255, 0.5);;
}
.meta {
    padding: 10px 40px;
    padding-bottom: 15px;
    background: #c70000;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
}
.date {
    font-size: 32px;
    font-weight: 600;
}
.author {
    display: flex;
    flex-direction: row;
    align-items: center;
    &__avatar {
        width: 25px;
        height: 25px;
        border-radius: 100%;
        margin-left: 10px;
    }
}
.message {
    font-size: 13px;
}
.changes {
    padding: 20px 40px;
    & > div:not(:last-child) {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding-bottom: 15px;
        margin-bottom: 15px;
    }
}
a, .v-application a {
    color: #fff;
}
</style>