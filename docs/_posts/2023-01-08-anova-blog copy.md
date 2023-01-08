---
title: "Anova blog original"


date: "January 7, 2023"
layout: postR
---

<head>

<meta charset="utf-8" />
<meta name="generator" content="pandoc" />
<meta http-equiv="X-UA-Compatible" content="IE=EDGE" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="date" content="2023-01-08" />

<script src="{{ site.url }}{{ site.baseurl }}/knitr_files/anova_files/header-attrs-2.19/header-attrs.js"></script>

<style type="text/css">code{white-space: pre;}</style>
<style type="text/css" data-origin="pandoc">
pre > code.sourceCode { white-space: pre; position: relative; }
pre > code.sourceCode > span { display: inline-block; line-height: 1.25; }
pre > code.sourceCode > span:empty { height: 1.2em; }
.sourceCode { overflow: visible; }
code.sourceCode > span { color: inherit; text-decoration: inherit; }
div.sourceCode { margin: 1em 0; }
pre.sourceCode { margin: 0; }
@media screen {
div.sourceCode { overflow: auto; }
}
@media print {
pre > code.sourceCode { white-space: pre-wrap; }
pre > code.sourceCode > span { text-indent: -5em; padding-left: 5em; }
}
pre.numberSource code
  { counter-reset: source-line 0; }
pre.numberSource code > span
  { position: relative; left: -4em; counter-increment: source-line; }
pre.numberSource code > span > a:first-child::before
  { content: counter(source-line);
    position: relative; left: -1em; text-align: right; vertical-align: baseline;
    border: none; display: inline-block;
    -webkit-touch-callout: none; -webkit-user-select: none;
    -khtml-user-select: none; -moz-user-select: none;
    -ms-user-select: none; user-select: none;
    padding: 0 4px; width: 4em;
    color: #aaaaaa;
  }
pre.numberSource { margin-left: 3em; border-left: 1px solid #aaaaaa;  padding-left: 4px; }
div.sourceCode
  {   }
@media screen {
pre > code.sourceCode > span > a:first-child::before { text-decoration: underline; }
}
code span.al { color: #ff0000; font-weight: bold; } /* Alert */
code span.an { color: #60a0b0; font-weight: bold; font-style: italic; } /* Annotation */
code span.at { color: #7d9029; } /* Attribute */
code span.bn { color: #40a070; } /* BaseN */
code span.bu { color: #008000; } /* BuiltIn */
code span.cf { color: #007020; font-weight: bold; } /* ControlFlow */
code span.ch { color: #4070a0; } /* Char */
code span.cn { color: #880000; } /* Constant */
code span.co { color: #60a0b0; font-style: italic; } /* Comment */
code span.cv { color: #60a0b0; font-weight: bold; font-style: italic; } /* CommentVar */
code span.do { color: #ba2121; font-style: italic; } /* Documentation */
code span.dt { color: #902000; } /* DataType */
code span.dv { color: #40a070; } /* DecVal */
code span.er { color: #ff0000; font-weight: bold; } /* Error */
code span.ex { } /* Extension */
code span.fl { color: #40a070; } /* Float */
code span.fu { color: #06287e; } /* Function */
code span.im { color: #008000; font-weight: bold; } /* Import */
code span.in { color: #60a0b0; font-weight: bold; font-style: italic; } /* Information */
code span.kw { color: #007020; font-weight: bold; } /* Keyword */
code span.op { color: #666666; } /* Operator */
code span.ot { color: #007020; } /* Other */
code span.pp { color: #bc7a00; } /* Preprocessor */
code span.sc { color: #4070a0; } /* SpecialChar */
code span.ss { color: #bb6688; } /* SpecialString */
code span.st { color: #4070a0; } /* String */
code span.va { color: #19177c; } /* Variable */
code span.vs { color: #4070a0; } /* VerbatimString */
code span.wa { color: #60a0b0; font-weight: bold; font-style: italic; } /* Warning */

/* A workaround for https://github.com/jgm/pandoc/issues/4278 */
a.sourceLine {
  pointer-events: auto;
}

</style>
<script>
// apply pandoc div.sourceCode style to pre.sourceCode instead
(function() {
  var sheets = document.styleSheets;
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].ownerNode.dataset["origin"] !== "pandoc") continue;
    try { var rules = sheets[i].cssRules; } catch (e) { continue; }
    for (var j = 0; j < rules.length; j++) {
      var rule = rules[j];
      // check if there is a div.sourceCode rule
      if (rule.type !== rule.STYLE_RULE || rule.selectorText !== "div.sourceCode") continue;
      var style = rule.style.cssText;
      // check if color or background-color is set
      if (rule.style.color === '' && rule.style.backgroundColor === '') continue;
      // replace div.sourceCode by a pre.sourceCode rule
      sheets[i].deleteRule(j);
      sheets[i].insertRule('pre.sourceCode{' + style + '}', j);
    }
  }
})();
</script>



<link rel="stylesheet" href="{{ site.url }}{{ site.baseurl }}/knitr_files/anova_files/style.css" type="text/css" />



</head>

<script src="{{ site.url }}{{ site.baseurl }}/knitr_files/anova_files/header-attrs-2.19/header-attrs.js"></script>

<section class="main-content">
<div id="anova" class="section level2">
<h2>Anova</h2>
<p>I am going to explain Anova</p>
<div class="sourceCode" id="cb1"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a><span class="fu">library</span>(ggplot2)</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a><span class="fu">library</span>(dplyr)</span></code></pre></div>
<pre><code>## 
## Attaching package: &#39;dplyr&#39;</code></pre>
<pre><code>## The following objects are masked from &#39;package:stats&#39;:
## 
##     filter, lag</code></pre>
<pre><code>## The following objects are masked from &#39;package:base&#39;:
## 
##     intersect, setdiff, setequal, union</code></pre>
<div class="sourceCode" id="cb5"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb5-1"><a href="#cb5-1" aria-hidden="true" tabindex="-1"></a><span class="fu">library</span>(tidyverse)</span></code></pre></div>
<pre><code>## ── Attaching packages
## ───────────────────────────────────────
## tidyverse 1.3.2 ──</code></pre>
<pre><code>## ✔ tibble  3.1.8.9005     ✔ purrr   1.0.0     
## ✔ tidyr   1.2.1          ✔ stringr 1.5.0     
## ✔ readr   2.1.3          ✔ forcats 0.5.2     
## ── Conflicts ────────────────────────────────────────── tidyverse_conflicts() ──
## ✖ dplyr::filter() masks stats::filter()
## ✖ dplyr::lag()    masks stats::lag()</code></pre>
<div class="sourceCode" id="cb8"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb8-1"><a href="#cb8-1" aria-hidden="true" tabindex="-1"></a><span class="fu">library</span>(ggpubr)</span>
<span id="cb8-2"><a href="#cb8-2" aria-hidden="true" tabindex="-1"></a><span class="fu">library</span>(rstatix)</span></code></pre></div>
<pre><code>## 
## Attaching package: &#39;rstatix&#39;
## 
## The following object is masked from &#39;package:stats&#39;:
## 
##     filter</code></pre>
<div class="sourceCode" id="cb10"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb10-1"><a href="#cb10-1" aria-hidden="true" tabindex="-1"></a><span class="fu">library</span>(psych) <span class="co">#for describe</span></span></code></pre></div>
<pre><code>## 
## Attaching package: &#39;psych&#39;
## 
## The following objects are masked from &#39;package:ggplot2&#39;:
## 
##     %+%, alpha</code></pre>
<div class="sourceCode" id="cb12"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb12-1"><a href="#cb12-1" aria-hidden="true" tabindex="-1"></a><span class="fu">source</span>(<span class="st">&quot;{{ site.url }}{{ site.baseurl }}/sim_anova2.R&quot;</span>)</span></code></pre></div>
</div>
<div id="data-simulatiom" class="section level2">
<h2>Data Simulatiom</h2>
<p>I prefer to simulate the data</p>
<div class="sourceCode" id="cb13"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb13-1"><a href="#cb13-1" aria-hidden="true" tabindex="-1"></a>sunlight_level <span class="ot">=</span> <span class="fu">c</span>(<span class="st">&quot;no sunlight&quot;</span>, <span class="st">&quot;low sunlight&quot;</span>, <span class="st">&quot;medium sunlight&quot;</span>, <span class="st">&quot;high sunlight&quot;</span>)</span>
<span id="cb13-2"><a href="#cb13-2" aria-hidden="true" tabindex="-1"></a>watering_freq <span class="ot">=</span> <span class="fu">c</span>(<span class="st">&quot;Weekly&quot;</span>,<span class="st">&quot;Daily&quot;</span>)</span>
<span id="cb13-3"><a href="#cb13-3" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb13-4"><a href="#cb13-4" aria-hidden="true" tabindex="-1"></a>tmp_f <span class="ot">&lt;-</span> <span class="cf">function</span>(i){ sunlight_level[i]}</span>
<span id="cb13-5"><a href="#cb13-5" aria-hidden="true" tabindex="-1"></a>tmp_f2 <span class="ot">&lt;-</span> <span class="cf">function</span>(i){ watering_freq[i]}</span>
<span id="cb13-6"><a href="#cb13-6" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb13-7"><a href="#cb13-7" aria-hidden="true" tabindex="-1"></a><span class="fu">set.seed</span>(<span class="dv">42</span>)</span>
<span id="cb13-8"><a href="#cb13-8" aria-hidden="true" tabindex="-1"></a>data.df <span class="ot">&lt;-</span> <span class="fu">sim.anova2</span>(<span class="at">es1=</span><span class="dv">1</span>,<span class="at">es2=</span>.<span class="dv">5</span>, <span class="at">es12 =</span> <span class="sc">-</span><span class="fl">0.2</span>, ,<span class="at">n =</span> <span class="dv">100</span>,<span class="at">n1 =</span> <span class="dv">4</span>, <span class="at">n2 =</span> <span class="dv">2</span>)  <span class="co"># one main effect and one interaction</span></span>
<span id="cb13-9"><a href="#cb13-9" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb13-10"><a href="#cb13-10" aria-hidden="true" tabindex="-1"></a>data.df<span class="sc">$</span>Sun_Light <span class="ot">=</span> <span class="fu">as.factor</span>( <span class="fu">as.numeric</span>(data.df<span class="sc">$</span>IV1) <span class="sc">%&gt;%</span> tmp_f)</span>
<span id="cb13-11"><a href="#cb13-11" aria-hidden="true" tabindex="-1"></a>data.df<span class="sc">$</span>Watering <span class="ot">=</span> <span class="fu">as.factor</span>( <span class="fu">as.numeric</span>(data.df<span class="sc">$</span>IV2) <span class="sc">%&gt;%</span> tmp_f2)</span>
<span id="cb13-12"><a href="#cb13-12" aria-hidden="true" tabindex="-1"></a>data.df<span class="sc">$</span>Plant_Growth <span class="ot">&lt;-</span> data.df<span class="sc">$</span>DV</span>
<span id="cb13-13"><a href="#cb13-13" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb13-14"><a href="#cb13-14" aria-hidden="true" tabindex="-1"></a>data.df<span class="sc">$</span>IV1 <span class="ot">&lt;-</span> <span class="cn">NULL</span></span>
<span id="cb13-15"><a href="#cb13-15" aria-hidden="true" tabindex="-1"></a>data.df<span class="sc">$</span>IV2 <span class="ot">&lt;-</span> <span class="cn">NULL</span></span>
<span id="cb13-16"><a href="#cb13-16" aria-hidden="true" tabindex="-1"></a>data.df<span class="sc">$</span>DV <span class="ot">&lt;-</span> <span class="cn">NULL</span></span></code></pre></div>
</div>
<div id="data-display" class="section level2">
<h2>Data Display</h2>
<p>Here you are.</p>
<div class="sourceCode" id="cb14"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb14-1"><a href="#cb14-1" aria-hidden="true" tabindex="-1"></a><span class="fu">describe</span>(data.df)</span></code></pre></div>
<pre><code>##              vars   n  mean   sd median trimmed  mad   min  max range  skew
## Sun_Light*      1 800  2.50 1.12   2.50    2.50 1.48  1.00 4.00  3.00  0.00
## Watering*       2 800  1.50 0.50   1.50    1.50 0.74  1.00 2.00  1.00  0.00
## Plant_Growth    3 800 -0.05 1.51   0.02   -0.01 1.59 -4.36 3.42  7.78 -0.22
##              kurtosis   se
## Sun_Light*      -1.36 0.04
## Watering*       -2.00 0.02
## Plant_Growth    -0.42 0.05</code></pre>
<div class="sourceCode" id="cb16"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb16-1"><a href="#cb16-1" aria-hidden="true" tabindex="-1"></a><span class="fu">pairs.panels</span>(data.df)</span></code></pre></div>
<p><img src="{{ site.url }}{{ site.baseurl }}/knitr_files/anova_files/figure-html/data%20pres-1.png" width="100%" style="display: block; margin: auto;" /></p>
<div class="sourceCode" id="cb17"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb17-1"><a href="#cb17-1" aria-hidden="true" tabindex="-1"></a><span class="fu">boxplot</span>(data.df)</span></code></pre></div>
<p><img src="{{ site.url }}{{ site.baseurl }}/knitr_files/anova_files/figure-html/data%20pres-2.png" width="100%" style="display: block; margin: auto;" /></p>
<div class="sourceCode" id="cb18"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb18-1"><a href="#cb18-1" aria-hidden="true" tabindex="-1"></a><span class="fu">summary</span>(<span class="fu">lm</span>(Plant_Growth<span class="sc">~</span>Sun_Light<span class="sc">*</span>Watering,<span class="at">data=</span>data.df)) </span></code></pre></div>
<pre><code>## 
## Call:
## lm(formula = Plant_Growth ~ Sun_Light * Watering, data = data.df)
## 
## Residuals:
##     Min      1Q  Median      3Q     Max 
## -2.9863 -0.6363  0.0212  0.6489  3.2999 
## 
## Coefficients:
##                                         Estimate Std. Error t value Pr(&gt;|t|)
## (Intercept)                              1.44745    0.09728  14.880  &lt; 2e-16
## Sun_Lightlow sunlight                   -1.17946    0.13757  -8.574  &lt; 2e-16
## Sun_Lightmedium sunlight                -0.64557    0.13757  -4.693 3.18e-06
## Sun_Lightno sunlight                    -2.09140    0.13757 -15.202  &lt; 2e-16
## WateringWeekly                          -0.33491    0.13757  -2.434   0.0151
## Sun_Lightlow sunlight:WateringWeekly    -1.20270    0.19455  -6.182 1.01e-09
## Sun_Lightmedium sunlight:WateringWeekly -0.43721    0.19455  -2.247   0.0249
## Sun_Lightno sunlight:WateringWeekly     -1.17109    0.19455  -6.019 2.68e-09
##                                            
## (Intercept)                             ***
## Sun_Lightlow sunlight                   ***
## Sun_Lightmedium sunlight                ***
## Sun_Lightno sunlight                    ***
## WateringWeekly                          *  
## Sun_Lightlow sunlight:WateringWeekly    ***
## Sun_Lightmedium sunlight:WateringWeekly *  
## Sun_Lightno sunlight:WateringWeekly     ***
## ---
## Signif. codes:  0 &#39;***&#39; 0.001 &#39;**&#39; 0.01 &#39;*&#39; 0.05 &#39;.&#39; 0.1 &#39; &#39; 1
## 
## Residual standard error: 0.9728 on 792 degrees of freedom
## Multiple R-squared:  0.5876, Adjusted R-squared:  0.5839 
## F-statistic: 161.2 on 7 and 792 DF,  p-value: &lt; 2.2e-16</code></pre>
<div class="sourceCode" id="cb20"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb20-1"><a href="#cb20-1" aria-hidden="true" tabindex="-1"></a><span class="fu">summary</span>(<span class="fu">aov</span>(Plant_Growth<span class="sc">~</span>Sun_Light<span class="sc">*</span>Watering,<span class="at">data=</span>data.df))</span></code></pre></div>
<pre><code>##                     Df Sum Sq Mean Sq F value   Pr(&gt;F)    
## Sun_Light            3  800.7  266.89  282.04  &lt; 2e-16 ***
## Watering             1  215.3  215.35  227.57  &lt; 2e-16 ***
## Sun_Light:Watering   3   51.7   17.23   18.21 1.97e-11 ***
## Residuals          792  749.5    0.95                     
## ---
## Signif. codes:  0 &#39;***&#39; 0.001 &#39;**&#39; 0.01 &#39;*&#39; 0.05 &#39;.&#39; 0.1 &#39; &#39; 1</code></pre>
<div class="sourceCode" id="cb22"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb22-1"><a href="#cb22-1" aria-hidden="true" tabindex="-1"></a>bxp <span class="ot">&lt;-</span> <span class="fu">ggboxplot</span>( data.df, <span class="at">x =</span> <span class="st">&quot;Watering&quot;</span>, <span class="at">y =</span> <span class="st">&quot;Plant_Growth&quot;</span>, <span class="at">color =</span> <span class="st">&quot;Sun_Light&quot;</span>, <span class="at">palette =</span> <span class="st">&quot;jco&quot;</span> )</span>
<span id="cb22-2"><a href="#cb22-2" aria-hidden="true" tabindex="-1"></a>bxp</span></code></pre></div>
<p><img src="{{ site.url }}{{ site.baseurl }}/knitr_files/anova_files/figure-html/boxplot-1.png" width="100%" style="display: block; margin: auto;" /></p>
<div class="sourceCode" id="cb23"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb23-1"><a href="#cb23-1" aria-hidden="true" tabindex="-1"></a>data.df <span class="sc">%&gt;%</span> <span class="fu">group_by</span>(Watering, Sun_Light) <span class="sc">%&gt;%</span> <span class="fu">identify_outliers</span>(Plant_Growth)</span></code></pre></div>
<pre><code>## # A tibble: 7 × 5
##   Sun_Light       Watering Plant_Growth is.outlier is.extreme
##   &lt;fct&gt;           &lt;fct&gt;           &lt;dbl&gt; &lt;lgl&gt;      &lt;lgl&gt;     
## 1 medium sunlight Daily            3.32 TRUE       FALSE     
## 2 medium sunlight Daily           -2.16 TRUE       FALSE     
## 3 no sunlight     Daily            2.66 TRUE       FALSE     
## 4 high sunlight   Weekly           3.40 TRUE       FALSE     
## 5 low sunlight    Weekly          -3.69 TRUE       FALSE     
## 6 medium sunlight Weekly          -2.96 TRUE       FALSE     
## 7 medium sunlight Weekly           3.00 TRUE       FALSE</code></pre>
</div>
<div id="build-the-linear-model" class="section level1">
<h1>Build the linear model</h1>
<div class="sourceCode" id="cb25"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb25-1"><a href="#cb25-1" aria-hidden="true" tabindex="-1"></a>model <span class="ot">&lt;-</span> <span class="fu">lm</span>(Plant_Growth <span class="sc">~</span> Sun_Light<span class="sc">*</span>Watering, <span class="at">data =</span> data.df) </span></code></pre></div>
</div>
<div id="create-a-qq-plot-of-residuals" class="section level1">
<h1>Create a QQ plot of residuals</h1>
<div class="sourceCode" id="cb26"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb26-1"><a href="#cb26-1" aria-hidden="true" tabindex="-1"></a><span class="fu">ggqqplot</span>(<span class="fu">residuals</span>(model))</span></code></pre></div>
<pre><code>## Warning: The following aesthetics were dropped during statistical transformation: sample
## ℹ This can happen when ggplot fails to infer the correct grouping structure in
##   the data.
## ℹ Did you forget to specify a `group` aesthetic or to convert a numerical
##   variable into a factor?
## The following aesthetics were dropped during statistical transformation: sample
## ℹ This can happen when ggplot fails to infer the correct grouping structure in
##   the data.
## ℹ Did you forget to specify a `group` aesthetic or to convert a numerical
##   variable into a factor?</code></pre>
<p><img src="{{ site.url }}{{ site.baseurl }}/knitr_files/anova_files/figure-html/qq%20plot-1.png" width="100%" style="display: block; margin: auto;" /></p>
<div class="sourceCode" id="cb28"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb28-1"><a href="#cb28-1" aria-hidden="true" tabindex="-1"></a><span class="fu">ggqqplot</span>(data.df, <span class="st">&quot;Plant_Growth&quot;</span>, <span class="at">ggtheme =</span> <span class="fu">theme_bw</span>()) <span class="sc">+</span> <span class="fu">facet_grid</span>(Watering <span class="sc">~</span> Sun_Light)</span></code></pre></div>
<pre><code>## Warning: The following aesthetics were dropped during statistical transformation: sample
## ℹ This can happen when ggplot fails to infer the correct grouping structure in
##   the data.
## ℹ Did you forget to specify a `group` aesthetic or to convert a numerical
##   variable into a factor?
## The following aesthetics were dropped during statistical transformation: sample
## ℹ This can happen when ggplot fails to infer the correct grouping structure in
##   the data.
## ℹ Did you forget to specify a `group` aesthetic or to convert a numerical
##   variable into a factor?
## The following aesthetics were dropped during statistical transformation: sample
## ℹ This can happen when ggplot fails to infer the correct grouping structure in
##   the data.
## ℹ Did you forget to specify a `group` aesthetic or to convert a numerical
##   variable into a factor?
## The following aesthetics were dropped during statistical transformation: sample
## ℹ This can happen when ggplot fails to infer the correct grouping structure in
##   the data.
## ℹ Did you forget to specify a `group` aesthetic or to convert a numerical
##   variable into a factor?
## The following aesthetics were dropped during statistical transformation: sample
## ℹ This can happen when ggplot fails to infer the correct grouping structure in
##   the data.
## ℹ Did you forget to specify a `group` aesthetic or to convert a numerical
##   variable into a factor?
## The following aesthetics were dropped during statistical transformation: sample
## ℹ This can happen when ggplot fails to infer the correct grouping structure in
##   the data.
## ℹ Did you forget to specify a `group` aesthetic or to convert a numerical
##   variable into a factor?
## The following aesthetics were dropped during statistical transformation: sample
## ℹ This can happen when ggplot fails to infer the correct grouping structure in
##   the data.
## ℹ Did you forget to specify a `group` aesthetic or to convert a numerical
##   variable into a factor?
## The following aesthetics were dropped during statistical transformation: sample
## ℹ This can happen when ggplot fails to infer the correct grouping structure in
##   the data.
## ℹ Did you forget to specify a `group` aesthetic or to convert a numerical
##   variable into a factor?
## The following aesthetics were dropped during statistical transformation: sample
## ℹ This can happen when ggplot fails to infer the correct grouping structure in
##   the data.
## ℹ Did you forget to specify a `group` aesthetic or to convert a numerical
##   variable into a factor?
## The following aesthetics were dropped during statistical transformation: sample
## ℹ This can happen when ggplot fails to infer the correct grouping structure in
##   the data.
## ℹ Did you forget to specify a `group` aesthetic or to convert a numerical
##   variable into a factor?
## The following aesthetics were dropped during statistical transformation: sample
## ℹ This can happen when ggplot fails to infer the correct grouping structure in
##   the data.
## ℹ Did you forget to specify a `group` aesthetic or to convert a numerical
##   variable into a factor?
## The following aesthetics were dropped during statistical transformation: sample
## ℹ This can happen when ggplot fails to infer the correct grouping structure in
##   the data.
## ℹ Did you forget to specify a `group` aesthetic or to convert a numerical
##   variable into a factor?
## The following aesthetics were dropped during statistical transformation: sample
## ℹ This can happen when ggplot fails to infer the correct grouping structure in
##   the data.
## ℹ Did you forget to specify a `group` aesthetic or to convert a numerical
##   variable into a factor?
## The following aesthetics were dropped during statistical transformation: sample
## ℹ This can happen when ggplot fails to infer the correct grouping structure in
##   the data.
## ℹ Did you forget to specify a `group` aesthetic or to convert a numerical
##   variable into a factor?
## The following aesthetics were dropped during statistical transformation: sample
## ℹ This can happen when ggplot fails to infer the correct grouping structure in
##   the data.
## ℹ Did you forget to specify a `group` aesthetic or to convert a numerical
##   variable into a factor?
## The following aesthetics were dropped during statistical transformation: sample
## ℹ This can happen when ggplot fails to infer the correct grouping structure in
##   the data.
## ℹ Did you forget to specify a `group` aesthetic or to convert a numerical
##   variable into a factor?</code></pre>
<p><img src="{{ site.url }}{{ site.baseurl }}/knitr_files/anova_files/figure-html/qq%20plot%20again-1.png" width="100%" style="display: block; margin: auto;" /></p>
<div class="sourceCode" id="cb30"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb30-1"><a href="#cb30-1" aria-hidden="true" tabindex="-1"></a>data.df <span class="sc">%&gt;%</span> <span class="fu">levene_test</span>(Plant_Growth <span class="sc">~</span> Sun_Light<span class="sc">*</span>Watering) </span></code></pre></div>
<pre><code>## # A tibble: 1 × 4
##     df1   df2 statistic     p
##   &lt;int&gt; &lt;int&gt;     &lt;dbl&gt; &lt;dbl&gt;
## 1     7   792     0.766 0.616</code></pre>
<div class="sourceCode" id="cb32"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb32-1"><a href="#cb32-1" aria-hidden="true" tabindex="-1"></a>res.aov <span class="ot">&lt;-</span> data.df <span class="sc">%&gt;%</span> <span class="fu">anova_test</span>(Plant_Growth <span class="sc">~</span> Sun_Light<span class="sc">*</span> Watering)</span>
<span id="cb32-2"><a href="#cb32-2" aria-hidden="true" tabindex="-1"></a>res.aov</span></code></pre></div>
<pre><code>## ANOVA Table (type II tests)
## 
##               Effect DFn DFd       F         p p&lt;.05   ges
## 1          Sun_Light   3 792 282.042 1.67e-124     * 0.517
## 2           Watering   1 792 227.570  2.18e-45     * 0.223
## 3 Sun_Light:Watering   3 792  18.206  1.97e-11     * 0.065</code></pre>
</div>
<div id="group-the-data-by-gender-and-fit-anova" class="section level1">
<h1>Group the data by gender and fit anova</h1>
<div class="sourceCode" id="cb34"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb34-1"><a href="#cb34-1" aria-hidden="true" tabindex="-1"></a>model <span class="ot">&lt;-</span> <span class="fu">lm</span>(Plant_Growth <span class="sc">~</span> Sun_Light <span class="sc">*</span> Watering, <span class="at">data =</span> data.df) </span>
<span id="cb34-2"><a href="#cb34-2" aria-hidden="true" tabindex="-1"></a>data.df <span class="sc">%&gt;%</span> <span class="fu">group_by</span>(Watering) <span class="sc">%&gt;%</span> <span class="fu">anova_test</span>(Plant_Growth <span class="sc">~</span> Sun_Light, <span class="at">error =</span> model)</span></code></pre></div>
<pre><code>## # A tibble: 2 × 8
##   Watering Effect      DFn   DFd     F         p `p&lt;.05`   ges
## * &lt;fct&gt;    &lt;chr&gt;     &lt;dbl&gt; &lt;dbl&gt; &lt;dbl&gt;     &lt;dbl&gt; &lt;chr&gt;   &lt;dbl&gt;
## 1 Daily    Sun_Light     3   792  82.7 1.53e- 46 *       0.238
## 2 Weekly   Sun_Light     3   792 218.  6.36e-103 *       0.452</code></pre>
</div>
<div id="pairwise-comparisons" class="section level1">
<h1>pairwise comparisons</h1>
<div class="sourceCode" id="cb36"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb36-1"><a href="#cb36-1" aria-hidden="true" tabindex="-1"></a><span class="fu">library</span>(emmeans) </span>
<span id="cb36-2"><a href="#cb36-2" aria-hidden="true" tabindex="-1"></a>pwc <span class="ot">&lt;-</span> data.df <span class="sc">%&gt;%</span> <span class="fu">group_by</span>(Watering) <span class="sc">%&gt;%</span> <span class="fu">emmeans_test</span>(Plant_Growth <span class="sc">~</span> Sun_Light, <span class="at">p.adjust.method =</span> <span class="st">&quot;bonferroni&quot;</span>) </span>
<span id="cb36-3"><a href="#cb36-3" aria-hidden="true" tabindex="-1"></a>pwc</span></code></pre></div>
<pre><code>## # A tibble: 12 × 10
##    Watering term     .y.   group1 group2    df stati…¹        p    p.adj p.adj…²
##  * &lt;chr&gt;    &lt;chr&gt;    &lt;chr&gt; &lt;chr&gt;  &lt;chr&gt;  &lt;dbl&gt;   &lt;dbl&gt;    &lt;dbl&gt;    &lt;dbl&gt; &lt;chr&gt;  
##  1 Daily    Sun_Lig… Plan… high … low s…   792    8.57 5.23e-17 3.14e-16 ****   
##  2 Daily    Sun_Lig… Plan… high … mediu…   792    4.69 3.18e- 6 1.91e- 5 ****   
##  3 Daily    Sun_Lig… Plan… high … no su…   792   15.2  5.49e-46 3.29e-45 ****   
##  4 Daily    Sun_Lig… Plan… low s… mediu…   792   -3.88 1.13e- 4 6.76e- 4 ***    
##  5 Daily    Sun_Lig… Plan… low s… no su…   792    6.63 6.26e-11 3.75e-10 ****   
##  6 Daily    Sun_Lig… Plan… mediu… no su…   792   10.5  2.83e-24 1.70e-23 ****   
##  7 Weekly   Sun_Lig… Plan… high … low s…   792   17.3  3.28e-57 1.97e-56 ****   
##  8 Weekly   Sun_Lig… Plan… high … mediu…   792    7.87 1.16e-14 6.95e-14 ****   
##  9 Weekly   Sun_Lig… Plan… high … no su…   792   23.7  2.32e-94 1.39e-93 ****   
## 10 Weekly   Sun_Lig… Plan… low s… mediu…   792   -9.45 3.88e-20 2.33e-19 ****   
## 11 Weekly   Sun_Lig… Plan… low s… no su…   792    6.40 2.67e-10 1.60e- 9 ****   
## 12 Weekly   Sun_Lig… Plan… mediu… no su…   792   15.8  2.56e-49 1.53e-48 ****   
## # … with abbreviated variable names ¹​statistic, ²​p.adj.signif</code></pre>
<div class="sourceCode" id="cb38"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb38-1"><a href="#cb38-1" aria-hidden="true" tabindex="-1"></a>pwc <span class="ot">&lt;-</span> data.df <span class="sc">%&gt;%</span> <span class="fu">group_by</span>(Watering) <span class="sc">%&gt;%</span> <span class="fu">tukey_hsd</span>(Plant_Growth <span class="sc">~</span> Sun_Light) </span>
<span id="cb38-2"><a href="#cb38-2" aria-hidden="true" tabindex="-1"></a>pwc</span></code></pre></div>
<pre><code>## # A tibble: 12 × 10
##    Watering term  group1 group2 null.…¹ estim…² conf.…³ conf.…⁴    p.adj p.adj…⁵
##  * &lt;fct&gt;    &lt;chr&gt; &lt;chr&gt;  &lt;chr&gt;    &lt;dbl&gt;   &lt;dbl&gt;   &lt;dbl&gt;   &lt;dbl&gt;    &lt;dbl&gt; &lt;chr&gt;  
##  1 Daily    Sun_… high … low s…       0  -1.18   -1.55   -0.813 0        ****   
##  2 Daily    Sun_… high … mediu…       0  -0.646  -1.01   -0.279 4.37e- 5 ****   
##  3 Daily    Sun_… high … no su…       0  -2.09   -2.46   -1.72  0        ****   
##  4 Daily    Sun_… low s… mediu…       0   0.534   0.167   0.901 1.13e- 3 **     
##  5 Daily    Sun_… low s… no su…       0  -0.912  -1.28   -0.545 2.37e- 9 ****   
##  6 Daily    Sun_… mediu… no su…       0  -1.45   -1.81   -1.08  0        ****   
##  7 Weekly   Sun_… high … low s…       0  -2.38   -2.72   -2.04  0        ****   
##  8 Weekly   Sun_… high … mediu…       0  -1.08   -1.43   -0.740 0        ****   
##  9 Weekly   Sun_… high … no su…       0  -3.26   -3.61   -2.92  0        ****   
## 10 Weekly   Sun_… low s… mediu…       0   1.30    0.957   1.64  0        ****   
## 11 Weekly   Sun_… low s… no su…       0  -0.880  -1.22   -0.538 6.59e-10 ****   
## 12 Weekly   Sun_… mediu… no su…       0  -2.18   -2.52   -1.84  0        ****   
## # … with abbreviated variable names ¹​null.value, ²​estimate, ³​conf.low,
## #   ⁴​conf.high, ⁵​p.adj.signif</code></pre>
</div>
<div id="visualization-box-plots-with-p-values" class="section level1">
<h1>Visualization: box plots with p-values</h1>
<div class="sourceCode" id="cb40"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb40-1"><a href="#cb40-1" aria-hidden="true" tabindex="-1"></a>pwc <span class="ot">&lt;-</span> pwc <span class="sc">%&gt;%</span> <span class="fu">add_xy_position</span>(<span class="at">x =</span> <span class="st">&quot;Watering&quot;</span>) </span>
<span id="cb40-2"><a href="#cb40-2" aria-hidden="true" tabindex="-1"></a>bxp <span class="sc">+</span> <span class="fu">stat_pvalue_manual</span>(pwc) <span class="sc">+</span> <span class="fu">labs</span>( <span class="at">subtitle =</span> <span class="fu">get_test_label</span>(res.aov, <span class="at">detailed =</span> <span class="cn">TRUE</span>), <span class="at">caption =</span> <span class="fu">get_pwc_label</span>(pwc) )</span></code></pre></div>
<p><img src="{{ site.url }}{{ site.baseurl }}/knitr_files/anova_files/figure-html/visual-1.png" width="100%" style="display: block; margin: auto;" /></p>
</div>
</section>
