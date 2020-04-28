$(document).ready(() =>
{
    $("#add").click(() =>
    {
        $("ul").append(
        `<li><span>${$("#list-input").val()}</span>
            <div class="icons-wrapper">
                <i class="fas fa-trash btn" aria-hidden="true"></i>
                <i class="far fa-check-circle chck" aria-hidden="true" value="0"></i>
            </div>
        </li>`);

        $("#list-input").val("");
    });

    $(document).on("click", ".chck", function ()
    {
        if($(this).attr("value") === "0")
        {
            $(this).parents("li").children("span").addClass("completed");
            $(this).replaceWith(`<i class="fas fa-check-circle chck chck-complete" aria-hidden="true" value="1"></i>`);
            // $(this).attr("value", "1");
        }
        else
        {
            $(this).parents("li").children("span").removeClass("completed")
            $(this).replaceWith(`<i class="far fa-check-circle chck" aria-hidden="true" value="0"></i>`);
            // $(this).attr("value", "0");
        }
    });

    $(document).on("click", ".btn", function ()
    {
        $(this).parentsUntil("ul").remove();
    });
});