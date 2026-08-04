<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

type SearchPost = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  minutes: number;
};

const props = defineProps<{ posts: SearchPost[]; tags: string[] }>();
const query = ref('');
const activeTag = ref('All');
const pagefindMatches = ref<string[] | null>(null);
let pagefind: any;

onMounted(async () => {
  try {
    pagefind = await import(/* @vite-ignore */ '/pagefind/pagefind.js');
    await pagefind.init();
  } catch {
    pagefind = null;
  }
});

let requestId = 0;
const runSearch = async () => {
  const id = ++requestId;
  const term = query.value.trim();
  if (!pagefind || term.length < 2) {
    pagefindMatches.value = null;
    return;
  }
  const search = await pagefind.search(term);
  const data = await Promise.all(search.results.map((result: any) => result.data()));
  if (id === requestId) {
    pagefindMatches.value = data.map((item: any) => item.url.replace(/^\/post\//, '').replace(/\/$/, ''));
  }
};

const results = computed(() => {
  const term = query.value.trim().toLowerCase();
  return props.posts.filter((post) => {
    const matchesTag = activeTag.value === 'All' || post.tags.includes(activeTag.value);
    const searchable = `${post.title} ${post.description} ${post.tags.join(' ')}`.toLowerCase();
    const matchesLocal = !term || searchable.includes(term);
    const matchesPagefind = !pagefindMatches.value || pagefindMatches.value.includes(post.id);
    return matchesTag && (matchesLocal || matchesPagefind);
  });
});

const selectTag = (tag: string) => {
  activeTag.value = tag;
};
</script>

<template>
  <section class="search-panel" aria-labelledby="search-title">
    <div class="search-heading">
      <div>
        <span class="eyebrow">EXPLORE THE ARCHIVE</span>
        <h2 id="search-title">Find an article</h2>
      </div>
      <label class="search-input">
        <span class="sr-only">Search articles and tags</span>
        <span aria-hidden="true">⌕</span>
        <input v-model="query" type="search" placeholder="Search articles and tags" @input="runSearch" />
      </label>
    </div>

    <div class="filter-row" aria-label="Filter by tag">
      <button :class="{ active: activeTag === 'All' }" type="button" @click="selectTag('All')">All</button>
      <button v-for="tag in tags" :key="tag" :class="{ active: activeTag === tag }" type="button" @click="selectTag(tag)">{{ tag }}</button>
    </div>

    <div class="search-results" aria-live="polite">
      <a v-for="post in results" :key="post.id" class="search-result" :href="`/post/${post.id}/`">
        <div>
          <span class="result-tags">{{ post.tags.join(' · ') }}</span>
          <h3>{{ post.title }}</h3>
          <p>{{ post.description }}</p>
        </div>
        <span class="result-meta">{{ post.date }} · {{ post.minutes }} min read <b aria-hidden="true">↗</b></span>
      </a>
      <p v-if="results.length === 0" class="empty-state">No articles match that search yet.</p>
    </div>
  </section>
</template>
