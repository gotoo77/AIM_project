window.SettingsView = Backbone.View.extend({

    initialize:function () {
		
        this.render();
    },

    render:function () {
        $(this.el).html(this.template());
		console.log(this);
        return this;
    }

});