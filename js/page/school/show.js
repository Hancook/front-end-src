define(["jquery", 'page/public/common'], function ($, common) {

    console.log(subjectsTableDatas);

    let colNum = 1;
    let rowspanNum = 0;

    for (let i = 0; i < subjectsTableDatas.length; i++) {

        if (i == (subjectsTableDatas.length - 1)) {
            rowspanNum++;
        }

        if ($("table.subjects tr:last").attr("name") != subjectsTableDatas[i].subjectClass || i == (subjectsTableDatas.length - 1)) {
            $(".row-span:first").attr("rowspan", rowspanNum);
            $(".row-span:first").show();
            $(".row-span").removeClass("row-span");
            rowspanNum = 0;
        }

        if ($("table.subjects tr:last").attr("name") != subjectsTableDatas[i].subjectClass || colNum == 1) {
            $("table.subjects tr:last").after($("table.subjects tr:nth-child(2)").clone());
            $("table.subjects tr:last").attr("name", subjectsTableDatas[i].subjectClass);
            colNum = 1;
        }

        if (colNum == 1) {
            $("table.subjects tr:last td:nth-child(1)").text(subjectsTableDatas[i].subjectClass);
            $("table.subjects tr:last td:nth-child(1)").addClass("row-span");
            $("table.subjects tr:last td:nth-child(1)").hide();
            rowspanNum++
            colNum++;
        }

        $("table.subjects tr:last td:nth-child(" + colNum + ") a").text(subjectsTableDatas[i].name)
        $("table.subjects tr:last td:nth-child(" + colNum + ") a").attr("href", window.location.href + "/major/" + subjectsTableDatas[i].id)

        colNum++;
        if (colNum == 7) {
            colNum = 1;
        }
    }
})
