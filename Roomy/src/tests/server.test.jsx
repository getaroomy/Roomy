import '@testing-library/jest-dom';

const serverURL = process.env.REACT_APP_SERVER_URL;

test('\'Get rentals\' request, should return back 200 status code', async () => {
    const response = await fetch(`${serverURL}/get_rentals`, {
        mode: 'cors', // no-cors, *cors, same-origin
        method: 'GET',
    });
    expect(response.status).toEqual(200);
});