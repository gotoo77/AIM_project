window.WineListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var wines = this.model.models;
        var len = wines.length;
        var startPos = (this.options.page - 1) * 16;
        var endPos = Math.min(startPos + 16, len);

        $(this.el).html('<ul class="thumbnails"></ul>');

        for (var i = startPos; i < endPos; i++) {
            $('.thumbnails', this.el).append(new WineListItemView({model: wines[i]}).render().el);
        }

        $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

        return this;
    },
	
	events: {
        "click .view_description" : "disp_description",
		//"click a.contact": "linkClicked"
    },
	
	disp_description: function () {
		//alert('test');
		$(".item_desc").toggle();
		//$(this.el.
    },
/*
	linkClicked: function(e){
		$(e.currentTarget).toggle(
		  function() {
			// odd clicks
		  },
		  function() {
			// even clicks
		  }
		);
	}
*/
});

window.WineListItemView = Backbone.View.extend({

    tagName: "li",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
	
});