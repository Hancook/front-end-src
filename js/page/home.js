define(["jquery"], function ($) {

    let test = `abc
        test
    `;

    let template = `
    {{if admin}}
        {{include 'admin_content'}}
        {{each list}}
            <div>{{$index}}. {{$value.user}}</div>
        {{/each}}
    {{/if}}
        `
    console.log(template)
})
