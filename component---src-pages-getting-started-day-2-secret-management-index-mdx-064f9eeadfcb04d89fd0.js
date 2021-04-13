(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{BAC9:function(e,t,a){e.exports={bxTextTruncateEnd:"EditLink-module--bx--text-truncate--end--2pqje",bxTextTruncateFront:"EditLink-module--bx--text-truncate--front--3_lIE",link:"EditLink-module--link--1qzW3",row:"EditLink-module--row--1B9Gk"}},I8xM:function(e,t,a){e.exports={bxTextTruncateEnd:"PageTabs-module--bx--text-truncate--end--267NA",bxTextTruncateFront:"PageTabs-module--bx--text-truncate--front--3xEQF",tabsContainer:"PageTabs-module--tabs-container--8N4k0",list:"PageTabs-module--list--3eFQc",listItem:"PageTabs-module--list-item--nUmtD",link:"PageTabs-module--link--1mDJ1",selectedItem:"PageTabs-module--selected-item--YPVr3"}},QH2O:function(e,t,a){e.exports={bxTextTruncateEnd:"PageHeader-module--bx--text-truncate--end--mZWeX",bxTextTruncateFront:"PageHeader-module--bx--text-truncate--front--3zvrI",pageHeader:"PageHeader-module--page-header--3hIan",darkMode:"PageHeader-module--dark-mode--hBrwL",withTabs:"PageHeader-module--with-tabs--3nKxA",text:"PageHeader-module--text--o9LFq"}},RjXp:function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return l})),a.d(t,"default",(function(){return d}));var n=a("wx14"),o=a("zLVn"),i=(a("q1tI"),a("7ljp")),r=a("XbGe"),s=a("T0C+"),l=(a("qKvR"),{}),c={_frontmatter:l},b=r.a;function d(e){var t=e.components,a=Object(o.a)(e,["components"]);return Object(i.b)(b,Object(n.a)({},c,a,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Deploying an application into containers involves both the application logic and the associated configuration. The application\nlogic is packaged into a container image so that it can be deployed but in order to make the container image portable\nacross different environments, the application configuration should be managed separately and applied to the application\ncontainer image at deployment time."),Object(i.b)("p",null,"Fortunately, container platforms lik ",Object(i.b)(s.a,{name:"ocp",mdxType:"Globals"})," and ",Object(i.b)(s.a,{name:"kube",mdxType:"Globals"})," provides a mechanism to easily\nprovide the configuration at deployment time: ConfigMaps and Secrets. Both ConfigMaps and Secrets work in the same way to\nrepresent information in key value pairs and allow that information to be attached to a running container in a number of\ndifferent ways. Unlike ConfigMaps, Secrets are intended to hold sensitive information (like passwords) and have additional access control facilities to limit who can read and use that information."),Object(i.b)("p",null,"With a ",Object(i.b)("a",{parentName:"p",href:"/getting-started-day-0/git-ops"},"GitOps")," approach to ",Object(i.b)("a",{parentName:"p",href:"/getting-started-day-2/continuous-delivery"},"continuous delivery"),",\nthe application container image and the associated configuration are represented in the Git repository together. When\nthe desired state defined in Git is applied to an environment, the relevant ",Object(i.b)(s.a,{name:"kube",mdxType:"Globals"})," resources like Deployments,\nConfigMaps, and Secrets are generated from the provided Git configuration."),Object(i.b)("p",null,"A common issue when doing GitOps is how to handle sensitive information that should not be stored in the Git repository\n(e.g. passwords, keys, etc). There are two different approaches to how to handle this issue:"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},"Inject the values from another source into kubernetes Secret(s) at deployment time"),Object(i.b)("li",{parentName:"ol"},"Inject the values from another source in the pod at startup time via an InitContainer")),Object(i.b)("p",null,"The “other source” in this case would be a key management system that centralizes the storage and management of sensitive\ninformation. There are a number of key management systems available to manage the secret values:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"/tools/secret-management-with-key-protect"},"Key Protect")),Object(i.b)("li",{parentName:"ul"},"Hyper Protect"),Object(i.b)("li",{parentName:"ul"},"Hashicorp Vault")),Object(i.b)("h2",null,"Use the key management system at deployment time"),Object(i.b)("p",null,Object(i.b)("a",{parentName:"p",href:"/tools/argocd"},"CD with ArgoCD")," covers how to use ArgoCD to do GitOps, including how to manage sensitive information in a\nkey management system."),Object(i.b)("h2",null,"Use the key management system at pod startup time"),Object(i.b)("p",null,"Coming soon"))}d.isMDXComponent=!0},XbGe:function(e,t,a){"use strict";var n=a("q1tI"),o=a.n(n),i=a("NmYn"),r=a.n(i),s=a("Wbzz"),l=a("Xrax"),c=a("k4MR"),b=a("TSYQ"),d=a.n(b),m=a("QH2O"),p=a.n(m),u=a("qKvR"),h=function(e){var t,a=e.title,n=e.theme,o=e.tabs,i=void 0===o?[]:o;return Object(u.b)("div",{className:d()(p.a.pageHeader,(t={},t[p.a.withTabs]=i.length,t[p.a.darkMode]="dark"===n,t))},Object(u.b)("div",{className:"bx--grid"},Object(u.b)("div",{className:"bx--row"},Object(u.b)("div",{className:"bx--col-lg-12"},Object(u.b)("h1",{id:"page-title",className:p.a.text},a)))))},g=a("BAC9"),f=function(e){var t=e.relativePagePath,a=e.repository,n=Object(s.useStaticQuery)("1364590287").site.siteMetadata.repository,o=a||n,i=o.baseUrl,r=o.subDirectory,l=i+"/edit/"+o.branch+r+"/src/pages"+t;return i?Object(u.b)("div",{className:"bx--row "+g.row},Object(u.b)("div",{className:"bx--col"},Object(u.b)("a",{className:g.link,href:l},"Edit this page on GitHub"))):null},j=a("dI71"),O=a("I8xM"),x=function(e){function t(){return e.apply(this,arguments)||this}return Object(j.a)(t,e),t.prototype.render=function(){var e=this.props,t=e.tabs,a=e.slug,n=a.split("/").filter(Boolean).slice(-1)[0],o=t.map((function(e){var t,o=r()(e,{lower:!0,strict:!0}),i=o===n,l=new RegExp(n+"/?(#.*)?$"),c=a.replace(l,o);return Object(u.b)("li",{key:e,className:d()((t={},t[O.selectedItem]=i,t),O.listItem)},Object(u.b)(s.Link,{className:O.link,to:""+c},e))}));return Object(u.b)("div",{className:O.tabsContainer},Object(u.b)("div",{className:"bx--grid"},Object(u.b)("div",{className:"bx--row"},Object(u.b)("div",{className:"bx--col-lg-12 bx--col-no-gutter"},Object(u.b)("nav",null,Object(u.b)("ul",{className:O.list},o))))))},t}(o.a.Component),y=a("MjG9"),v=a("CzIb");t.a=function(e){var t=e.pageContext,a=e.children,n=e.location,o=e.Title,i=t.frontmatter,b=void 0===i?{}:i,d=t.relativePagePath,m=t.titleType,p=b.tabs,g=b.title,j=b.theme,O=b.description,k=b.keywords,w=Object(v.a)().interiorTheme,T=Object(s.useStaticQuery)("223705900").site.pathPrefix,N=T?n.pathname.replace(T,""):n.pathname,P=p?N.split("/").filter(Boolean).slice(-1)[0]||r()(p[0],{lower:!0}):"",C=j||w;return Object(u.b)(c.a,{tabs:p,homepage:!1,theme:C,pageTitle:g,pageDescription:O,pageKeywords:k,titleType:m},Object(u.b)(h,{title:o?Object(u.b)(o,null):g,label:"label",tabs:p,theme:C}),p&&Object(u.b)(x,{slug:N,tabs:p,currentTab:P}),Object(u.b)(y.a,{padded:!0},a,Object(u.b)(f,{relativePagePath:d})),Object(u.b)(l.a,null))}}}]);
//# sourceMappingURL=component---src-pages-getting-started-day-2-secret-management-index-mdx-064f9eeadfcb04d89fd0.js.map