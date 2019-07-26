import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter, withRouter } from 'react-router-dom'
import App from '../components/App'
import loginService from './loginService'
import commentsService from './commentsService'

jest.mock('../sample_data/recipes.json', () => ({
    results: [
        {
            "title": "Recipe",
            "href": "",
            "ingredients": "Ingredient",
            "thumbnail": "image.jpg"
        },
        {
            "title": "Other Recipe",
            "href": "",
            "ingredients": "Other Ingredient",
            "thumbnail": "image.jpg"
        }
    ]
}), { virtual: true })

describe('App', () => {
    beforeEach(() => {
        jest.resetModules();
        localStorage.clear()
    });

    test('Test Login success', () => {
        loginService.register({
            username: 'test',
            password: 'pass'
        })

        const wrapper = mount(
            <MemoryRouter initialEntries={['/user/login']}>
                <App />
            </MemoryRouter>
        )

        wrapper.find('Login input[name="username"]').simulate('change', { target: { value: 'test', name: 'username' } })
        wrapper.find('Login input[name="password"]').simulate('change', { target: { value: 'pass', name: 'password' } })
        wrapper.find('Login button.login').simulate('click')
        wrapper.find('Login form').simulate('submit')
        expect(loginService.isLogged()).toBeTruthy()
    })

    test('Test Login error', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/user/login']}>
                <App />
            </MemoryRouter>
        )

        wrapper.find('Login input[name="username"]').simulate('change', { target: { value: 'test', name: 'username' } })
        wrapper.find('Login input[name="password"]').simulate('change', { target: { value: 'pass', name: 'password' } })
        wrapper.find('Login button.login').simulate('click')
        wrapper.find('Login form').simulate('submit')
        expect(loginService.isLogged()).toBeFalsy()
    })

    test('Test Register success', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/user/login']}>
                <App />
            </MemoryRouter>
        )

        wrapper.find('Login input[name="username"]').simulate('change', { target: { value: 'test', name: 'username' } })
        wrapper.find('Login input[name="password"]').simulate('change', { target: { value: 'pass', name: 'password' } })
        wrapper.find('Login button.register').simulate('click')
        wrapper.find('Login form').simulate('submit')
        expect(loginService.isLogged()).toBeTruthy()
        expect(loginService.getUser()).toEqual({
            username: 'test',
            password: 'pass'
        })
    })

    test('Create comment logged user', () => {
        const user = loginService.register({
            username: 'test',
            password: 'pass'
        })
        loginService.login(user)

        const wrapper = mount(
            <MemoryRouter initialEntries={['/recipe/recipe']}>
                <App />
            </MemoryRouter>
        )

        expect(wrapper.find('CommentsBlock textarea').props().disabled).toBeFalsy()
        expect(wrapper.find('CommentsBlock button[type="submit"]').props().disabled).toBeFalsy()

        wrapper
            .find('CommentsBlock textarea')
            .simulate('change', { target: { value: 'my comment' } })

        wrapper.find('CommentsBlock form').simulate('submit')
        expect(commentsService.get('recipe')).toHaveLength(1)
    })

    test('Comment disabled non logged user', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/recipe/recipe']}>
                <App />
            </MemoryRouter>
        )

        expect(wrapper.find('CommentsBlock textarea').props().disabled).toBeTruthy()
        expect(wrapper.find('CommentsBlock button[type="submit"]').props().disabled).toBeTruthy()
    })

    test('Render comments', () => {
        const user = loginService.register({
            username: 'test',
            password: 'pass'
        })
        loginService.login(user)
        commentsService.insert('recipe', {
            text: 'comment 1'
        })
        commentsService.insert('recipe', {
            text: 'comment 2'
        })

        const wrapper = mount(
            <MemoryRouter initialEntries={['/recipe/recipe']}>
                <App />
            </MemoryRouter>
        )

        expect(wrapper.find('CommentsBlock .Comment').length).toEqual(2)
    })

    test('Render comments with remove button', () => {
        const user = loginService.register({
            username: 'test',
            password: 'pass'
        })
        loginService.login(user)
        commentsService.insert('recipe', {
            text: 'comment 1'
        })
        
        const user2 = loginService.register({
            username: 'test2',
            password: 'pass'
        })
        loginService.login(user2)
        commentsService.insert('recipe', {
            text: 'comment 2'
        })

        const wrapper = mount(
            <MemoryRouter initialEntries={['/recipe/recipe']}>
                <App />
            </MemoryRouter>
        )

        expect(wrapper.find('CommentsBlock .Comment').length).toEqual(2)
        expect(wrapper.find('CommentsBlock FontAwesomeIcon[icon="trash"]').length).toEqual(1)
    })
})
