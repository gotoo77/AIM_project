window.HomeView = Backbone.View.extend({

    initialize:function () {
		console.log(this);
        this.render();
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    }

});