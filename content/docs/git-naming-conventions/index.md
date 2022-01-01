---
description: 'Прийняті патерни і правила іменування гілок та коміт-повідомлень в репозиторіях проекту ВебДоки'
sidebar: 'docs'
prev: '/docs/translating-in-github/'
next: '/docs/glossary/'
---

# Прийняті патерни іменування в репозиторіях

Git — надзвичайно гнучка система. Для спрощення процесу перекладу та ревю ми вирішили сформулювати певні правила іменування сутностей в git. Також пізніше це дасть нам можливість генерувати список останніх змін повністю автоматично.

За основу ми взяли [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).

## Структура коміт-повідомлення

Назви комітів записуємо у такому форматі:

<pre class="language-text"><code class="language-text"><span style="color: #7c4dff;">тип зміни</span>: <span style="color:#f6a434">опис зміни</span></code></pre>

За типом, всі зміни до кодової бази репозиторію ми поділяємо на такі групи:

- translation (все, що стосується перекладу)
- feature (додатковий функціонал — здебільшого використовується в коді платформи, а не в перекладах)
- fix (виправлення проблеми чи вади в функціоналі)
- chore (рутинна: оновлення внутрішньої документації, залежностей — щось, що не повинно йти в список змін) 

Наприклад:
<pre class="language-text"><code class="language-text"><span style="color: #7c4dff;">translation</span>: <span style="color:#f6a434">/docs/Web/JavaScript/Reference/Global_Objects/Map</span>
<span style="color: #7c4dff;">chore</span>: <span style="color:#f6a434">port web/index file from html to md</span></code></pre>

## Найменування гілок

Найменування гілок повинно дублювати структуру коміт-повідомлення. Але вказувати повне повідомлення не потрібно, достатньо якось скороченого запису, який просто дозволяє однозначно зрозуміти, що це за зміна. З поправкою на відсутність пробілів, оскільки в середовищі терміналу з пробілами незручно працювати.

<pre class="language-text"><code class="language-text"><span style="color: #7c4dff;">тип-зміни</span>/<span style="color:#f6a434">скорочений-опис-зміни</span></code></pre>

Наприклад:
<pre class="language-text"><code class="language-text"><span style="color: #7c4dff;">translation</span>/<span style="color:#f6a434">jsref-globals-map-index</span>
<span style="color: #7c4dff;">chore</span>/<span style="color:#f6a434">port-web-index-page-to-md</span></code></pre>
