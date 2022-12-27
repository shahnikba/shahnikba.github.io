---
layout: post
title: Causality
description: Test page
dropdown: Learnings
priority: 1
---
<ul>
{% for post in site.categories.Causality %}
    <a href="{{ post.url | prepend: site.baseurl }}">
      <h1 class="post-title"> {{ post.title }}</h1>
      <h5 class="post-title"> {{ post.date }} </h5>
    </a>
    {{post.excerpt}}
    {% if post.content contains site.excerpt_separator %}
      <b><a href="{{ post.url | prepend: site.baseurl }}">continue reading -&gt;</a></b>
    {% endif %}
    <br/>
    <div style="margin-bottom: 5em;"></div>
{% endfor %}
</ul>