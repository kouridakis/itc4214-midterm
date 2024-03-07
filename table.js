$(() => {
    let games = [
        { index: 1, title: 'Super Mario Bros.', rating: 10 },
        { index: 2, title: 'Tetris', rating: 8 },
        { index: 3, title: 'Pac-Man', rating: 8 },
    ];

    // Container for all sorting functions, to be used in the array.sort() method.
    let sortFunctions = {
        indexAscending: (a, b) => a.index - b.index,
        indexDescending: (a, b) => b.index - a.index,
        titleAscending: (a, b) => a.title.localeCompare(b.title),
        titleDescending: (a, b) => b.title.localeCompare(a.title),
        ratingAscending: (a, b) => a.rating - b.rating,
        ratingDescending: (a, b) => b.rating - a.rating,
    };
    let currentSort = sortFunctions.indexAscending;

    // For each sortable property, the only case the property's descending sort is used
    // is when the table is currently sorted by that property in ascending order.
    $('#th-index').on('click', () => {
        currentSort = 
            currentSort === sortFunctions.indexAscending 
                ? sortFunctions.indexDescending 
                : sortFunctions.indexAscending;
        
        updateTable();
    });
    $('#th-title').on('click', () => {
        currentSort = 
            currentSort === sortFunctions.titleAscending 
                ? sortFunctions.titleDescending 
                : sortFunctions.titleAscending;
        
        updateTable();
    });
    $('#th-rating').on('click', () => {
        currentSort = 
            currentSort === sortFunctions.ratingAscending 
                ? sortFunctions.ratingDescending 
                : sortFunctions.ratingAscending;
        
        updateTable();
    });

    // This function is intended to be called when any change is made to the table.
    // It clears the table (including sorting icons), 
    // displays the correct sorting icon,
    // sorts the games array,
    // and appends the games to the table.
    let updateTable= () => {
        let indexIcon = $('#th-index i')
        let titleIcon = $('#th-title i')
        let ratingIcon = $('#th-rating i')
        indexIcon.removeClass();
        titleIcon.removeClass();
        ratingIcon.removeClass();
        
        let ascendingClasses = 'bi bi-arrow-up';
        let descendingClasses = 'bi bi-arrow-down';

        switch (currentSort) {
            case sortFunctions.indexAscending:
                indexIcon.addClass(ascendingClasses);
                break;
            case sortFunctions.indexDescending:
                indexIcon.addClass(descendingClasses);
                break;
            case sortFunctions.titleAscending:
                titleIcon.addClass(ascendingClasses);
                break;
            case sortFunctions.titleDescending:
                titleIcon.addClass(descendingClasses);
                break;
            case sortFunctions.ratingAscending:
                ratingIcon.addClass(ascendingClasses);
                break;
            case sortFunctions.ratingDescending:
                ratingIcon.addClass(descendingClasses);
                break;
        };

        let tableBody = $('#games tbody');
        tableBody.empty();

        games.sort(currentSort);
        games.forEach((game) => {
            tableBody.append(/*html*/`
                <tr>
                    <td>${game.index}</td>
                    <td>${game.title}</td>
                    <td>${game.rating}</td>
                    <td><button class="btn btn-danger w-100 delete" data-index="${game.index}">Delete</button></td>
                </tr>
            `)
        });

        $('.delete').on('click', (e) => {
            // Due to sorting, there might be a discrepancy between the visible index and the actual index.
            let visibleIndex = $(e.target).data('index');
            let i = 0;
            games.forEach(game => {
                // Save the actual index of the game to be removed.
                if (game.index == visibleIndex) {
                    i = games.indexOf(game);
                }
                // Decrement games added afterwards to keep the visible index consistent.
                else if (game.index > visibleIndex) {
                    game.index--;
                }
            });
            // Remove the game after the loop instead of within it,
            // in order to avoid the need for 2 loops.
            games.splice(i, 1);

            updateTable();
        });
    };

    $('#game-form').on('submit', (e) => {
        // Prevent the page from reloading
        e.preventDefault(); 

        let title = $('#game-title').val().trim();
        let rating = $('#game-rating').val().trim();
        if (!title || !rating) return;

        let game = {
            index: games.length + 1,
            title: title,
            rating: rating
        };
        games.push(game);

        updateTable();
    });

    // Create the table when ready!
    updateTable();
})
