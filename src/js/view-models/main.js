<script type="text/javascript">
     function MyViewModel() {
         this.friends = [
            {name: 'Smith', contactNumber: 4556750345, email: 'smith123@gmail.com' },
            { name: 'Jack', contactNumber: 6789358001, email: 'jack123@yahoo.com' },
            { name: 'Lisa', contactNumber: 4567893131, email: 'lisa343@yahoo.com' }
         ]
     }

var vm = new MyViewModel();
ko.applyBindings(vm);
</script>
