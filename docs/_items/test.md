---
layout: "default"
permalink: "/test/"
title: "Testing"
author: "Testdir Author"
---

<h2>{{ site.author }}</h2>
<hr>
<br>
{% for person in site.data.people %}
   {{ person.name }}, 
   {{ person.occupation }}
   <br>
{% endfor %}

<hr>
<br>
{% for file in site.static_files %}
   {{ file.path }},
   {{ file.name }},
   {{ file.basename }},
   {{ file.extname }}
   <br>
{% endfor %}

<hr>
<br>
![alt text](../yoda.ico "Yoda")

<hr>

-  site.title -- {{ site.title }}
-  site.description -- {{ site.description }}
-  site.baseurl -- {{ site.baseurl }}
-  site.url -- {{ site.url }}
-  site.email -- {{ site.email }}
-  site.twitter_username -- {{ site.twitter_username }}
-  site.github_username -- {{ site.github_username }}
-  site.markdown -- {{ site.markdown }}
-  site.theme -- {{ site.theme }}
-  site.plugins -- {{ site.plugins }}
<hr>

